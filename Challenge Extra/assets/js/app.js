class Todo {
    constructor(todo) {
        this.created = new Date(),
        this.todo = todo
    }
}

class TodoContainer {
    constructor() {
        this.todos = []
    }

    addTodo(todo) {
        this.todos.push(todo)
    }

    deleteTodo(text) {
        console.log(text)
        this.todos = this.todos.filter(todo => {
            if(todo.todo.includes(text)) {
                
            } else {
                return todo
            }
        })
        console.log(this.todos)
    }
}

class TodoInputManager {
    constructor() {}

    getTodo() {
        return new Todo(
            document.getElementById('input').value
        )
    }

    clearInput() {
        document.getElementById('input').value = ""
    }
}

class TodoManager {
    constructor() {
        this.todoContainer = new TodoContainer()
        this.todoInputManager = new TodoInputManager()
        this.registerEventListeners()
    }

    registerEventListeners() {
        document.getElementById('input-btn').addEventListener('click', (e) => {
            let todo = this.todoInputManager.getTodo()
            this.todoContainer.addTodo(todo)
            this.todoInputManager.clearInput()
            this.render()
            this.getTodos()
            this.getXs()
        })
    }

    getTodos() {
        let todos = document.querySelectorAll('.list-item')
        for(let todo of todos) {
            todo.addEventListener('click', (e) => {
                e.target.classList.toggle('done')
            })
        }
    }

    getXs() {
        let xs = document.querySelectorAll('.x')
        for (let x of xs) {
            x.addEventListener('click', (e) => {
                let text = e.target.parentNode.innerText.split(' ')[0]
                this.todoContainer.deleteTodo(text)
                this.render()
                this.getTodos()
                this.getXs()
            })
        }
    }

    render() {
        let output = document.getElementById('output')
        output.innerHTML = ""
        let todos = this.todoContainer.todos
        for(let todo of todos) {
            output.innerHTML += `<li class="list-item">${todo.todo} <span class="x">x</span></li>`
        }
        
    }
}

const todoManager = new TodoManager()