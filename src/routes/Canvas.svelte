<script>
  import { onMount } from "svelte";
  import Tesseract from "tesseract.js";
  import { picStoreActions } from "./store";
  export let width = 500;
  export let height = 500;

  export let canvas;
  let wordList = ["Hare", "Rabbit", "Cow", "Slow"];
  let pointer = 0;
  let pointerLetter = 0;
  let m = { x: 0, y: 0, pos: "" };
  let draw = false;
  let mode = "draw";
  let correct = 0;
  let wrong = 0;

  $: console.log($picStoreActions);
  onMount(() => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#edeae6";
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 4;
  });
  function convertCanvasToImage() {
    let image = new Image();
    image.src = canvas.toDataURL();
    return image;
  }
  function checkLetter() {
    //console.log(canvas.toDataURL());
    Tesseract.recognize(canvas.toDataURL(), "eng", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      let char = wordList[pointer].split("")[pointerLetter];
      console.log(text, char);
      console.log(text.toLowerCase().trim() === char.toLowerCase().trim());
      if (text.toLowerCase().trim() === char.toLowerCase().trim()) {
        correct++;
      } else {
        wrong++;
      }

      if (pointerLetter === wordList[pointer].length - 1) {
        pointerLetter = 0;
        pointer++;
      } else {
        pointerLetter++;
      }
      wipeBoard();
    });
  }
  const wipeBoard = () => {
    console.log("Super retarted");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "#edeae6";
  };
  const handleClick = (e) => {
    let ctx = e.target.getContext("2d");
    //ctx.beginPath();
    m.x = e.clientX - e.target.offsetLeft;
    m.y = e.clientY - e.target.offsetTop;
    m.pos = "s";
    console.log("Click");
    draw = true;
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    picStoreActions.draw(m);
  };
  const handleDrag = (e) => {
    console.log("MODE", mode);
    let ctx = e.target.getContext("2d");
    m.x = e.clientX - e.target.offsetLeft;
    m.y = e.clientY - e.target.offsetTop;
    m.pos = "";
    if (draw && mode === "draw") {
      ctx.lineTo(m.x, m.y);
      ctx.stroke();
      //Add to store
      picStoreActions.draw(m);
    } else if (draw && mode === "erase") {
      picStoreActions.erase(m);
      //reDraw(ctx);
    }
  };
  const handleUnClick = (e) => {
    let ctx = e.target.getContext("2d");
    m.x = e.clientX - e.target.offsetLeft;
    m.y = e.clientY - e.target.offsetTop;
    m.pos = "e";
    ctx.closePath();
    picStoreActions.draw(m);
    draw = false;
    console.log("Un Click");
  };
</script>

<section class="bg-gray-800 h-screen grid grid-cols-3 text-white">
  <div class="flex items-center justify-center col-span-2">
    <div class="bg-white rounded-xl">
      <canvas
        bind:this={canvas}
        on:mousemove={(e) => handleDrag(e)}
        on:mousedown={(e) => handleClick(e)}
        on:mouseup={(e) => handleUnClick(e)}
        {width}
        {height}
      />
    </div>
  </div>
  <div class="h-screen bg-gray-700 p-10 flex flex-col">
    <span class="font-bold text-3xl">Assessment</span>
    <span class="font-bold opacity-50">Draw each character in the box</span>
    <div class="mt-10">
      <div>
        {#each wordList as word, index}
          {#if index === pointer}
            {#each word.split("") as letter, index2}
              <span
                class="mx-2 {index2 === pointerLetter
                  ? 'text-yellow-500'
                  : 'text-white'} font-bold text-6xl">{letter}</span
              >
            {/each}
          {/if}
        {/each}
      </div>
      <div class="mt-5">Correct Letter: {correct}</div>
      <div class="mt-5">Wrong Letter: {wrong}</div>
      <button
        on:click={checkLetter}
        class="border mt-5 rounded-xl p-3 w-full hover:bg-white hover:text-black transition-all"
        >Check Letter</button
      >
    </div>
  </div>
</section>
