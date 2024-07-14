

let timeMoves = document.getElementById("timeMoves")
let restart = document.getElementById("reStart")
let Start = document.getElementById("newGame")
let dots = document.getElementsByClassName("dots").item(0);
let inpEle = document.querySelector(".inputBar")


let inp = document.getElementById("inpValue")
let btn = document.getElementById("btnClick")
let c;
window.addEventListener("resize", () => {
    dots.scrollWidth < 200 ? timeMoves.style.width = "300px" : timeMoves.style.width = `${dots.scrollWidth}px`;

})
btn.onclick = () => {
    c = parseInt(inp.value)

    if (c > 7 && (c % 4) == 0) {
        startGame(c)
    } else {
        inpEle.classList.add("err")
        setTimeout(() => {
            inpEle.classList.remove("err")

        }, 1000);
    }


}

console.log(c);

function dotsCreate(num) {
    let round = document.createElement('div')
    round.classList.add("round", "true")
    round.textContent = num
    dots.appendChild(round)
}



const startGame = (count) => {
    inpEle.classList.remove("show")
    let mvs = timeMoves.getElementsByClassName("mvs").item(0)


    dots.style.gridTemplateColumns = `repeat(${count / 4}, 1fr)`;

    inp.value = ''

    document.querySelectorAll(".round").forEach(elements => {
        elements.remove()
    })

    let mv = 0
    mvs.textContent = mv

    let nums = [];

    let comps = []


    while (nums.length !== count) {
        let n = Math.floor(Math.random() * (count / 2)) + 1
        if (nums.filter(k => k == n).length <= 1) {
            nums.push(n)
            dotsCreate(n)
        }

    }

    timeMoves.style.width = `${dots.scrollWidth}px`;

    timer()

    const roundElements = document.querySelectorAll(".round");

    roundElements.forEach((item, index) => {
        item.addEventListener('click', () => {
            mv++
            item.classList.replace('true', 'last')
            mvs.textContent = mv
            comps.push(nums[index])


            if (comps.length >= 2) {

                if (comps.filter(n => n === comps[0]).length !== 2) {
                    document.querySelectorAll(".round.last").forEach(ite => {
                        setTimeout(() => {
                            ite.classList.replace('last', 'true')
                        }, 1000);
                    })
                } else {
                    document.querySelectorAll(".round.last").forEach(ite => {
                        setTimeout(() => {
                            ite.classList.replace('last', 'false')
                        }, 1000);
                    })
                }
                setTimeout(() => {
                    if (document.querySelectorAll(".round.false").length >= (count -1)) {
                        if (mvs < 20) {
                            alert("Very Super")
                        } else if (mvs < 30) {
                            alert("Super")
                        } else if (mvs < 40) {
                            alert("Good")
                        }
                        else {
                            alert("Try More...")
                        }
                    }

                }, 1000);


                comps = []
            }

        })

    })


}

let intervalID;

const timer = () => {
    clearInterval(intervalID)
    let tm = timeMoves.children.item(0).children.item(1);
    let sec = 0
    let min = 0


    intervalID = setInterval(() => {
        sec++
        if (sec.toString().length > 1) {
            tm.textContent = `${min}:${sec}`

        }
        else {
            tm.textContent = `${min}:0${sec}`

        }

        if (sec >= 60) {
            sec = 0
            min++
        }

    }, 1000);
}




Start.onclick = () => {
    // startGame()
    inpEle.classList.add("show")

}


restart.addEventListener("click", () => {
    startGame(c)
})






