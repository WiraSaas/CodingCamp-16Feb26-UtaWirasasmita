/* ==========================================================
   TO-DO LIST LOGIC - REVOU MINI PROJECT
              Uta Wirasasmita
   ========================================================== */

let tasks = [];
let currentFilter = 'ALL';

const inputTodo = document.getElementById('todo-input');
const inputDate = document.getElementById('date-input');
const btnAdd = document.getElementById('add-button');
const btnFilter = document.getElementById('filter-button');
const btnDeleteAll = document.getElementById('delete-all-button');
const listTable = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');

/**
 * 1. FUNGSI RENDER (Menggambar Tabel)
 */
function renderTasks() {
    listTable.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'ALL') return true;
        return task.status.toUpperCase() === currentFilter;
    });

    if (filteredTasks.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
        filteredTasks.forEach((task) => {
            const row = document.createElement('tr');
            let displayDate = '-';
            if(task.date) {
                const parts = task.date.split('-');
                if(parts.length === 3) displayDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
            }

            row.innerHTML = `
                <td>${task.text}</td>
                <td>${displayDate}</td>
                <td>
                    <span class="status-label ${task.status === 'Pending' ? 'status-pending' : 'status-completed'}" 
                          onclick="toggleStatus('${task.id}')" style="cursor:pointer">
                        ${task.status}
                    </span>
                </td>
                <td>
                    <button class="delete-task" onclick="deleteTask('${task.id}')">🗑</button>
                </td>
            `;
            listTable.appendChild(row);
        });
    }
}

/**
 * 2. LOGIKA TAMBAH TUGAS & AUTO-FOCUS
 * Menangani klik tombol + dan tombol Enter
 */
function addTask() {
    const text = inputTodo.value.trim();
    if (text === "") {
        alert("Harap isi nama tugas!");
        return;
    }
    tasks.push({
        id: Date.now().toString(),
        text: text,
        date: inputDate.value,
        status: 'Pending'
    });
    inputTodo.value = '';
    inputDate.value = '';
    renderTasks();
    inputTodo.focus(); // Kembalikan fokus ke awal setelah sukses tambah
}

// Klik tombol +
btnAdd.onclick = addTask;

// Logika Enter: Pindah kursor atau Submit
inputTodo.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (inputTodo.value.trim() !== "") {
            inputDate.focus(); // PINDAH KE INPUT TANGGAL
        }
    }
});

inputDate.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTask(); // SUBMIT TUGAS
    }
});

/**
 * 3. FUNGSI DELETE ALL
 */
if (btnDeleteAll) {
    btnDeleteAll.onclick = function() {
        if (tasks.length === 0) return alert("Daftar sudah kosong!");
        tasks = []; 
        renderTasks();
        console.log("Semua tugas berhasil dihapus.");
    };
}

/**
 * 4. FUNGSI HAPUS SATUAN
 */
window.deleteTask = function(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
};

/**
 * 5. FUNGSI GANTI STATUS
 */
window.toggleStatus = function(id) {
    const idx = tasks.findIndex(t => t.id === id);
    if (idx !== -1) {
        tasks[idx].status = tasks[idx].status === 'Pending' ? 'Completed' : 'Pending';
        renderTasks();
    }
};

/**
 * 6. FUNGSI FILTER
 */
if (btnFilter) {
    btnFilter.onclick = function() {
        if (currentFilter === 'ALL') currentFilter = 'PENDING';
        else if (currentFilter === 'PENDING') currentFilter = 'COMPLETED';
        else currentFilter = 'ALL';
        btnFilter.innerText = `FILTER: ${currentFilter}`;
        renderTasks();
    };
}

renderTasks();