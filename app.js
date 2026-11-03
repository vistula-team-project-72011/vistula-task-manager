// Application State
const state = {
    supabaseUrl: '',
    supabaseKey: '',
    tableName: 'tasks'
};

// API Helper for Headers
function getHeaders() {
    return {
        'apikey': state.supabaseKey,
        'Authorization': `Bearer ${state.supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    };
}

// Initialize Application
async function initApp() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) throw new Error('Failed to load config.json');
        
        const config = await response.json();
        state.supabaseUrl = config.supabaseUrl;
        state.supabaseKey = config.supabasePublishableKey;
        state.tableName = config.tableName;
        
        await fetchTasks();
    } catch (error) {
        showStatus('Error initializing application. Check config.json.', true);
        console.error(error);
    }
}

// --- CRUD Operations ---

// READ: Fetch all tasks
async function fetchTasks() {
    try {
        const response = await fetch(`${state.supabaseUrl}/rest/v1/${state.tableName}?select=*&order=id.desc`, {
            method: 'GET',
            headers: getHeaders()
        });
        
        if (!response.ok) throw new Error('Failed to fetch tasks');
        
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        showStatus('Error fetching tasks.', true);
        console.error(error);
    }
}

// CREATE: Add a new task
async function addTask(event) {
    event.preventDefault(); // Prevent page reload
    
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    
    const newTask = {
        title: title,
        description: description,
        completed: false // Default value required by assignment
    };
    
    try {
        const response = await fetch(`${state.supabaseUrl}/rest/v1/${state.tableName}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(newTask)
        });
        
        if (!response.ok) throw new Error('Failed to create task');
        
        document.getElementById('task-form').reset();
        showStatus('Task added successfully!');
        await fetchTasks(); // Refresh the list
        
    } catch (error) {
        showStatus('Error adding task.', true);
        console.error(error);
    }
}

// UPDATE: Toggle task completion status
async function updateTask(id, currentStatus) {
    try {
        const response = await fetch(`${state.supabaseUrl}/rest/v1/${state.tableName}?id=eq.${id}`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify({ completed: !currentStatus })
        });
        
        if (!response.ok) throw new Error('Failed to update task');
        
        showStatus('Task updated successfully!');
        await fetchTasks(); // Refresh the list to show the new status
        
    } catch (error) {
        showStatus('Error updating task.', true);
        console.error(error);
    }
}

// DELETE: Remove a task completely
async function deleteTask(id) {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
        const response = await fetch(`${state.supabaseUrl}/rest/v1/${state.tableName}?id=eq.${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        
        if (!response.ok) throw new Error('Failed to delete task');
        
        showStatus('Task deleted!');
        await fetchTasks(); // Refresh the list to remove the deleted task
        
    } catch (error) {
        showStatus('Error deleting task.', true);
        console.error(error);
    }
}

// --- UI Rendering ---

function renderTasks(tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; 
    
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.style.border = "1px solid #ccc";
        taskElement.style.margin = "10px 0";
        taskElement.style.padding = "10px";
        
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description || 'No description'}</p>
            <p><strong>Status:</strong> ${task.completed ? 'Completed' : 'Pending'}</p>
            <button onclick="updateTask(${task.id}, ${task.completed})">Toggle Status</button>
            <button onclick="deleteTask(${task.id})" style="color: red; margin-left: 10px;">Delete</button>
        `;
        taskList.appendChild(taskElement);
    });
}

function showStatus(message, isError = false) {
    const statusDiv = document.getElementById('status-message');
    statusDiv.textContent = message;
    statusDiv.style.color = isError ? 'red' : 'green';
    setTimeout(() => { statusDiv.textContent = ''; }, 3000);
}

// --- Event Listeners ---
document.getElementById('task-form').addEventListener('submit', addTask);

// Start the app
initApp();