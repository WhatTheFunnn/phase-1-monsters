let allMonsters = []
let page = 0

document.addEventListener('DOMContentLoaded', () => {
    getMonsters()
    monsterList()
    newMonster()
})

function newMonster() {
    let btn = document.createElement("button");
    btn.innerHTML = "New Monster";
    btn.className = "monster-button"
    const div = document.getElementById("create-monster")
    div.appendChild(btn)
    btn.addEventListener("click", (e) => {
        let form = document.createElement("form")
        div.appendChild(form)
        let name = document.createElement("p")
        name.innerText = "Name:"
        let age = document.createElement("p")
        age.innerText = "Age:"
        let description = document.createElement("P")
        description.innerText = "Description:"
        let i1 = document.createElement("input")
        let i2 = document.createElement("input")
        let i3 = document.createElement("input")
        form.appendChild(name)
        form.appendChild(i1)
        form.appendChild(age)
        form.appendChild(i2)
        form.appendChild(description)
        form.appendChild(i3)  

        let subBtn = document.createElement("button")
        subBtn.innerHTML = "Submit"
        form.appendChild(subBtn)
        subBtn.addEventListener("click", (e) => {
            const mName = i1.value
            const mAge = i2.value
            const mDescription = i3.value

            let data = {"name": mName, "age": mAge, "description": mDescription }
            console.log(data)

            fetch("http://localhost:3000/monsters", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    console.log("success", data)
                })
                .catch((error) => {
                    console.error("error", error)
                })
                alert("Your Monster has been added")
        })

    })
}

function getMonsters() {
    const div = document.getElementById("monster-container")
    const size = 50
    fetch("http://localhost:3000/monsters")
        .then(response => response.json())
        .then(monsters => {
            allMonsters = monsters
            const ms = monsters.slice(0, size)
            ms.forEach(monster => {
                shortList(monster)
            })
        })
}

function shortList(monster) {
    const body = document.getElementById("monster-container")
    const div = document.createElement('div')
    div.className = "card"
    const h2 = document.createElement("h1")
    const p = document.createElement("p")
    body.appendChild(div)
    div.appendChild(h2)
    div.appendChild(p)
    h2.innerText = `${monster.name}`
    p.innerText = `Age: ${monster.age}

    Decsription: ${monster.description}`
}



function monsterList() {
    const forward = document.getElementById('forward')
    const previous = document.getElementById('back')
    const divContainer = document.getElementById("monster-container")
    forward.addEventListener("click", (e) => {
        while (divContainer.firstChild) {
            divContainer.removeChild(divContainer.firstChild);
        }
        page++
        const nextPage = allMonsters.slice(page * 50, page * 50 + 50)
        nextPage.forEach(monster => {
            shortList(monster)
            console.log(page)
        })
    })
    previous.addEventListener("click", (e) => {
        while (divContainer.firstChild) {
            divContainer.removeChild(divContainer.firstChild);
        }
        page--
        const previousPage = allMonsters.slice(page * 50, page * 50 - 50)
        previousPage.forEach(monster => {
            shortList(monster)

            getMonsters()
        })
    })

}


// cannot move the submit button in the form => need help with movement as the padding, margins, and spans wouldn't work for me

// how do you stop the page from going to 0 elements under the div container when you go below page 0 - my idea was to stop the page at 0 and then reload page at 0 so the monster list reloaded.
