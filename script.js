AOS.init({
    duration: 800,
    once: true
});

// Logic Task Manager
let tasks = JSON.parse(localStorage.getItem('taskhub_data')) || [];

function renderTasks() {
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');
    
    taskList.innerHTML = '';
    taskCount.innerText = `${tasks.length} Tugas`;

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="text-center py-12">
                <p class="text-slate-400 italic">Belum ada tugas hari ini. Mulai dengan menambah tugas baru!</p>
            </div>
        `;
        return;
    }

    tasks.forEach((task, index) => {
        const item = document.createElement('div');
        item.className = "task-item flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl shadow-sm";
        item.innerHTML = `
            <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    ${index + 1}
                </div>
                <div>
                    <h4 class="font-bold text-slate-800">${task.title}</h4>
                    <p class="text-xs text-slate-500 font-medium">
                        <i class="far fa-calendar-check mr-1"></i> ${task.date || 'Tanpa Deadline'}
                    </p>
                </div>
            </div>
            <button onclick="removeTask(${index})" class="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition">
                <i class="fas fa-trash"></i>
            </button>
        `;
        taskList.appendChild(item);
    });

    // Simpan ke memori browser
    localStorage.setItem('taskhub_data', JSON.stringify(tasks));
}

function addTask() {
    const titleInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');

    if (titleInput.value.trim() === "") {
        alert("Silakan isi nama tugas!");
        return;
    }

    const newTask = {
        title: titleInput.value,
        date: dateInput.value,
        id: Date.now()
    };

    tasks.push(newTask);
    titleInput.value = '';
    dateInput.value = '';
    renderTasks();
}

function removeTask(index) {
    if(confirm('Hapus tugas ini?')) {
        tasks.splice(index, 1);
        renderTasks();
    }
}

// Jalankan saat pertama kali buka web
renderTasks();
