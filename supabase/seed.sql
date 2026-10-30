-- DRAFT sample data. Edit categories freely. Starter links are legal free resources only.

insert into public.categories (name, slug, description) values
  ('Video and streaming', 'video-streaming', 'Free and legal video, films and shows'),
  ('Music and audio', 'music-audio', 'Free music, podcasts and audio tools'),
  ('Games', 'games', 'Free games and game resources'),
  ('Books and reading', 'books-reading', 'Public domain and open access books'),
  ('Learning and education', 'learning', 'Free courses and study resources'),
  ('Software and tools', 'software-tools', 'Free and open source software'),
  ('AI tools', 'ai-tools', 'AI assistants and related tools'),
  ('Developer resources', 'developer', 'Docs, code hosting and learning for developers'),
  ('Images and design', 'images-design', 'Free images, icons and design tools'),
  ('Miscellaneous', 'misc', 'Everything else');

insert into public.links (title, url, description, category_id, tags)
select 'Internet Archive', 'https://archive.org', 'Free books, films, music and web archive', c.id, array['archive','books','video','audio']
from public.categories c where c.slug = 'misc';

insert into public.links (title, url, description, category_id, tags)
select 'Project Gutenberg', 'https://www.gutenberg.org', 'Public domain ebooks', c.id, array['ebooks','public-domain']
from public.categories c where c.slug = 'books-reading';

insert into public.links (title, url, description, category_id, tags)
select 'Khan Academy', 'https://www.khanacademy.org', 'Free lessons across many subjects', c.id, array['courses','free']
from public.categories c where c.slug = 'learning';

insert into public.links (title, url, description, category_id, tags)
select 'MDN Web Docs', 'https://developer.mozilla.org', 'Web development documentation', c.id, array['web','docs']
from public.categories c where c.slug = 'developer';

insert into public.links (title, url, description, category_id, tags)
select 'Wikimedia Commons', 'https://commons.wikimedia.org', 'Freely usable images and media', c.id, array['images','free']
from public.categories c where c.slug = 'images-design';

-- After creating your admin user in Supabase Auth, run:
-- insert into public.admins (user_id) values ('PASTE-USER-UUID-HERE');
