const api = {
  async list() {
    const res = await fetch('/api/items');
    return res.json();
  },
  async create(payload) {
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create');
    return res.json();
  },
  async update(id, payload) {
    const res = await fetch(`/api/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update');
    return res.json();
  },
  async remove(id) {
    const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete');
    return res.json();
  },
};

const listEl = document.getElementById('items');
const formEl = document.getElementById('item-form');
const titleEl = document.getElementById('title');
const descEl = document.getElementById('description');

function renderItem(item) {
  const li = document.createElement('li');
  li.dataset.id = item.id;

  const meta = document.createElement('div');
  meta.className = 'item-meta';
  const title = document.createElement('div');
  title.textContent = item.title;
  const desc = document.createElement('div');
  desc.className = 'muted';
  desc.textContent = item.description || '';
  meta.appendChild(title);
  meta.appendChild(desc);

  const actions = document.createElement('div');
  actions.className = 'actions';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.onclick = async () => {
    const newTitle = prompt('New title', item.title);
    if (newTitle === null) return;
    const newDesc = prompt('New description', item.description || '');
    try {
      const updated = await api.update(item.id, { title: newTitle, description: newDesc });
      li.replaceWith(renderItem(updated));
    } catch (e) {
      alert(e.message);
    }
  };

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.onclick = async () => {
    if (!confirm('Delete this item?')) return;
    try {
      await api.remove(item.id);
      li.remove();
    } catch (e) {
      alert(e.message);
    }
  };

  actions.appendChild(editBtn);
  actions.appendChild(delBtn);

  li.appendChild(meta);
  li.appendChild(actions);
  return li;
}

async function refresh() {
  listEl.innerHTML = '';
  const data = await api.list();
  data.forEach((item) => listEl.appendChild(renderItem(item)));
}

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const created = await api.create({ title: titleEl.value.trim(), description: descEl.value.trim() });
    listEl.appendChild(renderItem(created));
    formEl.reset();
    titleEl.focus();
  } catch (e) {
    alert(e.message);
  }
});

refresh();



