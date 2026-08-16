// ==========================
// DATA
// ==========================

const problems = [

{
    question:"Find the Mean of 4, 6, 2, 5, 3",
    names:["John","Anne","Tom","Bob","Tim"],
    values:[4,6,2,5,3]
},

{
    question:"Find the Mean of 8, 3, 7, 4, 3",
    names:["John","Anne","Tom","Bob","Tim"],
    values:[8,3,7,4,3]
}

];



let values=[];
let original=[];
let selected=null;



// ==========================
// PAGE FUNCTIONS
// ==========================

function goHome(){

    document.getElementById("home").classList.remove("hidden");
    document.getElementById("theory").classList.add("hidden");
    document.getElementById("problem").classList.add("hidden");

}

function showTheory(){

    document.getElementById("home").classList.add("hidden");
    document.getElementById("theory").classList.remove("hidden");
    document.getElementById("problem").classList.add("hidden");

}



function loadProblem(index){

    values=[...problems[index].values];
    original=[...problems[index].values];

    document.getElementById("question").innerHTML =
    problems[index].question;

    for(let i=0;i<5;i++){

        document.getElementById("name"+i).innerHTML =
            problems[index].names[i];

    }

    document.getElementById("home").classList.add("hidden");
    document.getElementById("theory").classList.add("hidden");
    document.getElementById("problem").classList.remove("hidden");

    render();

}



function resetProblem(){

    values=[...original];

    selected=null;

    document.getElementById("success").innerHTML="";

    render();

}



// ==========================
// RENDER
// ==========================

function render(){

    updateTable();

    drawStacks();

    updateFooter();

}



// ==========================
// TABLE
// ==========================

function updateTable(){

    for(let i=0;i<5;i++){

        document.getElementById("m"+i).innerHTML=values[i];

    }

}



// ==========================
// FOOTER
// ==========================

function updateFooter(){

    const total=values.reduce((a,b)=>a+b,0);

    document.getElementById("total").innerHTML=total;

    document.getElementById("mean").innerHTML=
        total/values.length;

}



// ==========================
// DRAW STACKS
// ==========================

function drawStacks(){

    const area=document.getElementById("stackArea");

    area.innerHTML="";



    values.forEach((count,index)=>{

        const column=document.createElement("div");

        column.style.display="flex";
        column.style.flexDirection="column";
        column.style.alignItems="center";



        const number=document.createElement("div");

        number.className="stack-number";

        number.innerHTML=count;

        column.appendChild(number);



        const stack=document.createElement("div");

        stack.className="stack";



        if(selected===index){

            stack.classList.add("selected");

        }



        stack.onclick=()=>clickStack(index);



        for(let i=0;i<count;i++){

            const cube=document.createElement("div");

            cube.className="cube";

            stack.appendChild(cube);

        }



        column.appendChild(stack);

        area.appendChild(column);

    });

}



// ==========================
// MOVE CUBES
// ==========================

function clickStack(index){

    if(selected===null){

        if(values[index]===0){

            return;

        }

        selected=index;

        render();

        return;

    }



    if(selected===index){

        selected=null;

        render();

        return;

    }



    values[selected]--;

    values[index]++;



    selected=null;

    render();

    checkSolved();

}

// ==========================
// SUCCESS
// ==========================

function checkSolved(){

    const total = values.reduce((a,b)=>a+b,0);

    const mean = total / values.length;

    const solved = values.every(v => v === mean);

    const success = document.getElementById("success");

    if(!solved){

        success.innerHTML = "";

        return;

    }

    success.innerHTML = `
        <div style="
            background:#e8f5e9;
            border:3px solid #4CAF50;
            padding:25px;
            border-radius:18px;
            box-shadow:0 8px 20px rgba(0,0,0,.15);
        ">
            <h2>🎉 Excellent!</h2>

            <p style="margin-top:15px;font-size:22px;">
                Every student now has <b>${mean}</b> cubes.
            </p>

            <p style="margin-top:10px;font-size:20px;">
                This equal value is called the <b>Mean</b>.
            </p>
        </div>
    `;

}

// ==========================
// START
// ==========================

goHome();