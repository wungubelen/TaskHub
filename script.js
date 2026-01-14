// Aktifkan Animasi Muncul saat Scroll
AOS.init({ duration: 1000, once: true });

// Ambil data dari penyimpanan browser
let tasks = JSON.parse(localStorage.getItem('taskhub_app_data')) || [];

function renderTasks() {
    const list = document.getElementById('taskList');
    const count = document.getElementById('taskCount');
    
    if (!list) return;

    list.innerHTML = '';
    count.innerText = tasks.length;

    if (tasks.length === 0) {
        list.innerHTML = `
            <div class="text-center py-20">
                <p class="text-slate-300 font-medium">Workspace kosong. Tambahkan tugas untuk memulai.</p>
            </div>
        `;
        return;
    }

    tasks.forEach((task, index) => {
        const item = document.createElement('div');
        item.className = `task-card flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[24px] shadow-sm ${task.done ? 'done-state' : ''}`;
        
        item.innerHTML = `
            <div class="flex items-center gap-5">
                <div onclick="toggleTask(${index})" class="w-8 h-8 rounded-full border-2 border-slate-200 flex items-center justify-center cursor-pointer hover:border-blue-600 transition-all ${task.done ? 'bg-blue-600 border-blue-600' : ''}">
                    ${task.done ? '<i class="fas fa-check text-white text-[10px]"></i>' : ''}
                </div>
                <div>
                    <h4 class="font-bold text-slate-800">${task.title}</h4>
                    <p class="text-xs text-slate-400 font-bold uppercase tracking-wider"><i class="far fa-calendar-alt mr-1"></i> ${task.date || 'Tiap Hari'}</p>
                </div>
            </div>
            <button onclick="deleteTask(${index})" class="text-slate-200 hover:text-red-500 transition-all">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        list.appendChild(item);
    });

    localStorage.setItem('taskhub_app_data', JSON.stringify(tasks));
}

function addTask() {
    const title = document.getElementById('taskInput');
    const date = document.getElementById('dateInput');

    if (!title.value.trim()) {
        alert("Isi judul tugas!");
        return;
    }

    tasks.unshift({
        title: title.value,
        date: date.value,
        done: false
    });

    title.value = '';
    date.value = '';
    renderTasks();
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Jalankan fungsi saat web dibuka
renderTasks();
