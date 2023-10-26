const start_button=document.querySelector(".start_btn button");
const information=document.querySelector(".starting_info");
const exit_btn=information.querySelector(".exit_restart_button .exit");
const restart_btn=information.querySelector(".exit_restart_button .restart");
const questions_box=document.querySelector(".questions_box");
const options_list=document.querySelector(".option_list");
const timer=document.querySelector(".time_sec");
const timeline=document.querySelector(".timer_line");


//when click on start button it adds the rule page next

start_button.onclick =() =>
{
    information.classList.add("show");
}

//when click on exit button it romove the rule container and return back to start button

exit_btn.onclick =() =>
{
    information.classList.remove("show");
}

//when click on play button it enters into the quiz game

restart_btn.onclick =() =>
{
    information.classList.remove("show");
    questions_box.classList.add("showbox");
    showquestion(0); // onclicking play button first question will be loaded and since array indexing starts with 0,that's why 0 is passed (0 mean first question)
    questionCount(1); //this is for bottom question counting section (it will start from 1)
    starttime(15); //starts the time(15 mean you only get 15 sec time to ans)
    starttimeline(500); //starts the time line(500 mean 500px,width of the line and it will decrese to 0 when the time also hit 0)
}

let question_count=0; 
let bottom_count=1;
let counter;
let counterline;
let timevalue=15;
let widthval=500;
let userscore=0;  // user's correct ans

//when next button is clicked

let next_button=document.querySelector(".next");
const result=document.querySelector(".result");
const last_restart=document.querySelector(".last_buttons .restart");
const last_exit=document.querySelector(".last_buttons .exit");


//if you want to play the quiz again and press restart button, it will load the questions again

last_restart.onclick=()=>
{
    questions_box.classList.add("showbox");
    result.classList.remove("showres");
    question_count=0; 
    bottom_count=1;
    timevalue=15;
    widthval=500;
    userscore=0;
    showquestion(question_count);
    questionCount(bottom_count);
    clearInterval(counter);
    starttime(timevalue);
    clearInterval(counterline);
    starttimeline(widthval);
    timeline.classList.remove("show");
    timer.classList.remove("colorred");
    next_button.style.display="none";
}

//if you want to exit the quiz

last_exit.onclick=()=>
{
    window.location.reload();
}


//on clocking the next button in question box

next_button.onclick=()=>
{
    if(question_count < questions.length-1)  // if question count is less than total question then following statement will execute
    {
        question_count++; // question count will increase by 1
        bottom_count++; //In bottom also question count increase by 1
        showquestion(question_count); //for showing the question and options
        questionCount(bottom_count);  // for counting questions in footer
        clearInterval(counter); // reset the time for next question
        starttime(timevalue);  // for starting the time in header(15 sec)
        clearInterval(counterline); //reset the time line for next qusetion
        starttimeline(widthval); // for starting the time line in header
        timeline.classList.remove("show"); //red color time remove
        timer.classList.remove("colorred"); //red color time line remove
        next_button.style.display="none"; // dont show next button when question count exceed the total question
    }
    else
    {
        console.log("completed");
        showresult(); //for showing the final result
    }
   
}


//dispalying questions and its options


function showquestion(i)
{
    const question_text=document.querySelector(".questions");
    let question_now='<span>'+questions[i].no+". "+questions[i].question+'</span>'; // fetching the question from question.js
    let option_now='<div class="option"><span>a. '+ questions[i].options[0] +'</span></div>' 
                  +'<div class="option"><span>b. '+ questions[i].options[1] +'</span></div>'
                  +'<div class="option"><span>c. '+ questions[i].options[2] +'</span></div>'
                  +'<div class="option"><span>d. '+ questions[i].options[3] +'</span></div>'; //fetching the options from question.js
    question_text.innerHTML=question_now; //updating the questions 
    options_list.innerHTML=option_now; //updating the options
    const selectedoption=document.querySelectorAll(".option");
    for(let i=0;i<selectedoption.length;i++)
    {
        selectedoption[i].setAttribute("onclick","selectedOption(this)"); //onclicking any option,will check if the clicked answer is correct or not
    }
}



let tick='<div class="icon"><span class="tick">&#10004</span></div>';
let cross='<div class="cross_icon"><span class="cross">&#10006</span></div>';


//varifying if user chooses the correct answer or not

function selectedOption(ans)
{
    clearInterval(counter);
    clearInterval(counterline);
    let userans=ans.textContent.substring(3);  //user's choosen answer
    let corrans=questions[question_count].answer; //correct answer
    console.log(userans); //printing user ans in console
    console.log(corrans); //printing correct ans in console
    console.log(question_count);
    let alloption=options_list.children.length;
    if(userans==corrans) 
    {
        ans.classList.add("correct");// if the ans is correct change its text and background color to green
        console.log("correct");
        userscore++;
        ans.insertAdjacentHTML("beforeend",tick); // if answer is correct,show the tick mark
    }
    else
    {
        ans.classList.add("incorrect");// if the ans is incorrect change its text and background color to red
        console.log("incorrect");
        ans.insertAdjacentHTML("beforeend",cross); // if ans is incorrect show the cross mark

        //if answer is incorrect then automatiaclly show correct answer

        for(let i=0;i<alloption;i++)
        {
            if(options_list.children[i].textContent.substring(3)==corrans)
            {
                options_list.children[i].setAttribute("class","option correct"); // going through all the answer and after finding the correct answer changing its properties to correct answer
                options_list.children[i].insertAdjacentHTML("beforeend",tick); // if answer is incorrect ,show the correct ans and display the tick
            }

        }
    }

    for(let i=0;i< alloption;i++)
    {
        options_list.children[i].classList.add("disabled");// once user selected one option disabled other option
    }
    next_button.style.display="block";

}


//count question in footter section[1 of 5 questions]

function questionCount(i)
{
    const bottom_question_count=document.querySelector(".total_question");
    let bootomtotaltag='<pre><span><p><b>'+i +" "+'</b></p><p>of</p><p><b>'+" "+ questions.length+" " +'</b></p><p>questions</p></span></pre>';
    bottom_question_count.innerHTML=bootomtotaltag;
}

//timer in header 

function starttime(time)
{
    counter=setInterval(timefunc,1000); // every 1 s call the function
    function timefunc()
    {
        timer.textContent=time;
        time--;                //decrese the time by 1
        if(time < 9)           //when time is less than 10,prefix 0 to it (e.g-  08 )
        {
            let addzero=timer.textContent;
            timer.textContent="0"+addzero;
        }
        if(time<0)          //when time is 0 , reset the time for next question
        {
            clearInterval(counter);
            timer.textContent="00";

            let corrans=questions[question_count].answer; //correct answer
            let alloption=options_list.children.length;

            for(let i=0;i<alloption;i++)
            {
                if(options_list.children[i].textContent.substring(3)==corrans)
                {
                    options_list.children[i].setAttribute("class","option correct"); // going through all the answer and after finding the correct answer changing its properties to correct answer
                    options_list.children[i].insertAdjacentHTML("beforeend",tick); // if answer is incorrect ,show the correct ans and display the tick
                }

            }


            for(let i=0;i< alloption;i++)
            {
                options_list.children[i].classList.add("disabled");// once user selected one option disabled other option
            }
            next_button.style.display="block";
        }
    }
}



//for showing line which increase until 15 sec

function starttimeline(time)
{
    counterline=setInterval(timefunc,33);//in every 33ms call this function
    function timefunc()
    {
        time--;
        timeline.style.width=time+"px";
        if(time<230)                   //when line width is less than 230px change it's color to red
        {
            timeline.classList.add("show");
            timer.classList.add("colorred");
        }
        if(time<0)                   //when time is 0,reset everything
        {
            clearInterval(counterline);
            timeline.classList.remove("show");
            timer.classList.remove("colorred");
        }
    }
}

//showing result box


function showresult()
{
    information.classList.remove("show");
    questions_box.classList.remove("showbox");
    result.classList.add("showres");
    const qusetion_got=document.querySelector(".question_got");
    if(userscore>3)
    {
        let score_got="<span>congrats ! you got<p>"+ userscore +"</p>out of <p>"+ questions.length + "</p></span>"; //if correct ans is greater than 3,show this o/p
        qusetion_got.innerHTML=score_got;
    }
    else if(userscore>1)
    {
        let score_got="<span>Nice ! you got<p>"+ userscore +"</p>out of <p>"+ questions.length + "</p>but try harder next time</span>";//if correct ans is greater than 1,show this text messege
        qusetion_got.innerHTML=score_got;
    }
    else
    {
        let score_got="<span>sorry ! you got<p>"+ userscore +"</p>out of <p>"+ questions.length + "</p>and need to work on your js</span>";//if correct ans is 1 or less,show this messege
        qusetion_got.innerHTML=score_got;
    }
}




