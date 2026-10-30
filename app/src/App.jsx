import { useEffect, useMemo, useRef, useState } from 'react'
import { HashRouter, Routes, Route, NavLink, Link, useParams } from 'react-router-dom'
import { supabase } from './supabase'

const domainOf = (url) => {
  try { return new URL(url).hostname.replace(/^www\./, '') } catch { return url }
}

function Fav({ url }) {
  const [bad, setBad] = useState(false)
  const d = domainOf(url)
  return bad ? (
    <span className="fav letter" aria-hidden="true">{d[0]?.toUpperCase()}</span>
  ) : (
    <img className="fav" alt="" loading="lazy" width="36" height="36"
      src={`https://www.google.com/s2/favicons?domain=${d}&sz=64`} onError={() => setBad(true)} />
  )
}

function useDirectory() {
  const [cats, setCats] = useState([])
  const [links, setLinks] = useState([])
  const [state, setState] = useState('loading')
  const load = async () => {
    const [c, l] = await Promise.all([
      supabase.from('categories').select('*').order('name'),
      supabase.from('links').select('*').order('title'),
    ])
    if (c.error || l.error) return setState('error')
    setCats(c.data)
    setLinks(l.data)
    setState('ready')
  }
  useEffect(() => { load() }, [])
  return { cats, links, state, reload: load }
}

function Directory({ cats, links, state }) {
  const { slug } = useParams()
  const [q, setQ] = useState('')
  const ref = useRef(null)
  const cat = cats.find((c) => c.slug === slug)
  const pool = useMemo(() => links.filter((l) => l.status === 'approved'), [links])
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase()
    return pool.filter(
      (l) =>
        (!cat || l.category_id === cat.id) &&
        (!t || [l.title, l.description, l.url, ...(l.tags || [])].join(' ').toLowerCase().includes(t))
    )
  }, [pool, cat, q])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        e.preventDefault()
        ref.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <section className="hero">
        <h1>{cat ? cat.name : 'Find the right site, fast'}</h1>
        <p className="lede">{cat?.description || `${pool.length} links in ${cats.length} categories`}</p>
        <div className="searchbox">
          <input
            ref={ref}
            type="search"
            placeholder={cat ? `Search in ${cat.name}` : 'Search all links'}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search links"
          />
          <kbd aria-hidden="true">/</kbd>
        </div>
      </section>
      {state === 'loading' && <p className="muted">Loading links…</p>}
      {state === 'error' && <p className="error">Could not load links. Check the Supabase URL and key, then reload.</p>}
      {state === 'ready' && (
        <p className="count-line">
          {shown.length} {shown.length === 1 ? 'link' : 'links'}{q.trim() && ` matching “${q.trim()}”`}
        </p>
      )}
      {state === 'ready' && shown.length === 0 && <p className="muted">No links match. Try a different word or category.</p>}
      <ul className="list">
        {shown.map((l) => (
          <li key={l.id} className="row">
            <a className="item" href={l.url} target="_blank" rel="noopener noreferrer">
              <Fav url={l.url} />
              <span className="body">
                <span className="line">
                  <span className="title">{l.title}</span>
                  <span className="domain">{domainOf(l.url)}</span>
                  {l.is_broken && <span className="down">may be down</span>}
                </span>
                {l.description && <span className="desc">{l.description}</span>}
              </span>
              <svg className="go" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                <path d="M5 11l6-6M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            {l.tags?.length > 0 && (
              <p className="tags">{l.tags.map((t) => <button key={t} onClick={() => setQ(t)}>{t}</button>)}</p>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setErr(error.message)
  }
  return (
    <form className="panel narrow" onSubmit={submit}>
      <h1>Admin sign in</h1>
      <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
      <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
      {err && <p className="error">{err}</p>}
      <button className="primary" type="submit">Sign in</button>
    </form>
  )
}

const empty = { id: null, title: '', url: '', description: '', category_id: '', tags: '' }

function Manager({ cats, links, reload }) {
  const [f, setF] = useState(empty)
  const [msg, setMsg] = useState('')
  const [onlyDown, setOnlyDown] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const catName = (id) => cats.find((c) => c.id === id)?.name || 'No category'

  const save = async (e) => {
    e.preventDefault()
    setMsg('')
    try { new URL(f.url) } catch { return setMsg('Enter a full URL starting with https://') }
    const row = {
      title: f.title.trim(),
      url: f.url.trim(),
      description: f.description.trim() || null,
      category_id: f.category_id || null,
      tags: f.tags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean),
    }
    const { error } = f.id
      ? await supabase.from('links').update(row).eq('id', f.id)
      : await supabase.from('links').insert(row)
    if (error) return setMsg(error.message)
    setF(empty)
    setMsg('Saved')
    reload()
  }
  const edit = (l) => {
    setF({ id: l.id, title: l.title, url: l.url, description: l.description || '', category_id: l.category_id || '', tags: (l.tags || []).join(', ') })
    window.scrollTo({ top: 0 })
  }
  const remove = async (l) => {
    if (!window.confirm(`Delete "${l.title}"?`)) return
    const { error } = await supabase.from('links').delete().eq('id', l.id)
    if (error) return setMsg(error.message)
    reload()
  }
  const clearFlag = async (l) => {
    const { error } = await supabase.from('links').update({ is_broken: false }).eq('id', l.id)
    if (error) return setMsg(error.message)
    reload()
  }

  const rows = links.filter((l) => !onlyDown || l.is_broken)
  return (
    <>
      <div className="bar">
        <h1>{f.id ? 'Edit link' : 'Add link'}</h1>
        <button onClick={() => supabase.auth.signOut()}>Sign out</button>
      </div>
      <form className="panel" onSubmit={save}>
        <label>Title<input value={f.title} onChange={set('title')} required /></label>
        <label>URL<input value={f.url} onChange={set('url')} placeholder="https://" required /></label>
        <label>Description<input value={f.description} onChange={set('description')} /></label>
        <label>Category
          <select value={f.category_id} onChange={set('category_id')}>
            <option value="">No category</option>
            {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <label>Tags (comma separated)<input value={f.tags} onChange={set('tags')} /></label>
        <div className="actions">
          <button className="primary" type="submit">{f.id ? 'Save changes' : 'Add link'}</button>
          {f.id && <button type="button" onClick={() => setF(empty)}>Cancel edit</button>}
        </div>
        {msg && <p className={msg === 'Saved' ? 'muted' : 'error'}>{msg}</p>}
      </form>
      <div className="bar">
        <h2>All links ({rows.length})</h2>
        <label className="check"><input type="checkbox" checked={onlyDown} onChange={(e) => setOnlyDown(e.target.checked)} /> Only flagged as down</label>
      </div>
      <ul className="list one">
        {rows.map((l) => (
          <li key={l.id} className="row admin-row">
            <Fav url={l.url} />
            <div className="body">
              <div className="line">
                <span className="title">{l.title}</span>
                <span className="domain">{domainOf(l.url)} · {catName(l.category_id)}</span>
                {l.is_broken && <span className="down">may be down</span>}
              </div>
            </div>
            <div className="actions">
              <button onClick={() => edit(l)}>Edit</button>
              {l.is_broken && <button onClick={() => clearFlag(l)}>Clear flag</button>}
              <button onClick={() => remove(l)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

function Admin({ cats, links, reload }) {
  const [session, setSession] = useState(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true) })
    const { data } = supabase.auth.onAuthStateChange((_e, s) => { setSession(s); reload() })
    return () => data.subscription.unsubscribe()
  }, [])
  if (!ready) return <p className="muted">Loading…</p>
  return session ? <Manager cats={cats} links={links} reload={reload} /> : <Login />
}

export default function App() {
  const dir = useDirectory()
  const count = (id) => dir.links.filter((l) => l.status === 'approved' && l.category_id === id).length
  return (
    <HashRouter>
      <header className="top">
        <Link to="/" className="brand"><span className="logo">y</span>yhmf</Link>
        <Link to="/admin" className="admin">Admin</Link>
      </header>
      <div className="shell">
        <nav className="side" aria-label="Categories">
          <NavLink to="/" end>All links</NavLink>
          {dir.cats.map((c) => (
            <NavLink key={c.id} to={`/c/${c.slug}`}>{c.name} <span className="count">{count(c.id)}</span></NavLink>
          ))}
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Directory {...dir} />} />
            <Route path="/c/:slug" element={<Directory {...dir} />} />
            <Route path="/admin" element={<Admin {...dir} />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}
