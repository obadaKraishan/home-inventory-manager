document.addEventListener('DOMContentLoaded', () => {
    fetchItems();
  
    document.getElementById('itemForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const itemId = this.dataset.id;
      if (itemId) {
        updateItem(itemId);
      } else {
        addItem();
      }
    });
  
    document.getElementById('searchInput').addEventListener('input', function() {
      searchItems(this.value);
    });
  });
  
  async function fetchItems() {
    const response = await fetch('/api/items');
    const items = await response.json();
    displayItems(items);
  }
  
  async function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemCategory = document.getElementById('itemCategory').value;
    const purchaseDate = document.getElementById('purchaseDate').value;
    const warrantyPeriod = document.getElementById('warrantyPeriod').value;
  
    const response = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: itemName, category: itemCategory, purchaseDate, warrantyPeriod })
    });
  
    const newItem = await response.json();
    displayItem(newItem);
  
    document.getElementById('itemForm').reset();
  }
  
  async function updateItem(id) {
    const itemName = document.getElementById('itemName').value;
    const itemCategory = document.getElementById('itemCategory').value;
    const purchaseDate = document.getElementById('purchaseDate').value;
    const warrantyPeriod = document.getElementById('warrantyPeriod').value;
  
    const response = await fetch(`/api/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: itemName, category: itemCategory, purchaseDate, warrantyPeriod })
    });
  
    const updatedItem = await response.json();
    fetchItems();
  
    document.getElementById('itemForm').reset();
    document.getElementById('itemForm').removeAttribute('data-id');
  }
  
  function displayItems(items) {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    items.forEach(displayItem);
  }
  
  function displayItem(item) {
    const itemList = document.getElementById('itemList');
    const itemElement = document.createElement('li');
    itemElement.className = 'list-group-item';
    itemElement.innerHTML = `
      <div class="d-flex justify-content-between">
        <div>
          <h5>${item.name}</h5>
          <p>Category: ${item.category}</p>
          <p>Purchase Date: ${new Date(item.purchaseDate).toLocaleDateString()}</p>
          <p>Warranty Period: ${item.warrantyPeriod}</p>
        </div>
        <div>
          <button class="btn btn-warning btn-sm mr-2" onclick="editItem('${item._id}')">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteItem('${item._id}')">Delete</button>
        </div>
      </div>
    `;
    itemList.appendChild(itemElement);
  }
  
  async function deleteItem(id) {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    fetchItems();
  }
  
  function searchItems(query) {
    const items = document.querySelectorAll('#itemList .list-group-item');
    items.forEach(item => {
      const itemName = item.querySelector('h5').textContent.toLowerCase();
      if (itemName.includes(query.toLowerCase())) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }
  
  function editItem(id) {
    const itemElement = document.querySelector(`#itemList .list-group-item [onclick="editItem('${id}')"]`).parentElement.parentElement;
    const itemName = itemElement.querySelector('h5').textContent;
    const itemCategory = itemElement.querySelector('p:nth-child(2)').textContent.split(': ')[1];
    const purchaseDate = new Date(itemElement.querySelector('p:nth-child(3)').textContent.split(': ')[1]).toISOString().substr(0, 10);
    const warrantyPeriod = itemElement.querySelector('p:nth-child(4)').textContent.split(': ')[1];
  
    document.getElementById('itemName').value = itemName;
    document.getElementById('itemCategory').value = itemCategory;
    document.getElementById('purchaseDate').value = purchaseDate;
    document.getElementById('warrantyPeriod').value = warrantyPeriod;
    document.getElementById('itemForm').dataset.id = id;
  }
  