<script>
  import { Jumper } from "svelte-loading-spinners";
  import { onMount } from "svelte";
  import speechUtteranceChunker from "./chucker";
  import { location } from "svelte-spa-router";
  import { get } from "svelte/store";
  let courseID = get(location).substr(get(location).lastIndexOf("/") + 1);
  let courseTitle = "";
  let text =
    "Hey guys welcome back to my youtube channel please like and subscribeasdasdasdawfgwegwethsertjstrdfhsertjhsdfgh".split(
      " "
    );

  onMount(() => {
    fetch(`http://localhost:5000/course/${courseID}`, {
      method: "GET",
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);
        courseTitle = data.course.title;
        text = data.course.content.split(" ");
      });
  });
  let fontValue = 50;
  let selectedText = 0;
  let marginValue = 10;
  let highlighted = -1;
  let isVisualOpen = false;
  let loading = false;
  let speechRate = 5;
  let imageURL = "";

  let readEachWordOut = false;

  function handleKeydown(event) {
    console.log(event.key);
    let key = event.key;
    if (key === "Enter") {
      if (selectedText === text.length - 1) return;
      selectedText++;
      if (readEachWordOut) {
        let utterance = new SpeechSynthesisUtterance(text[selectedText]);

        speechUtteranceChunker(utterance, speechRate);
        //speechSynthesis.speak(utterance);
      }
      document
        .getElementById("highlighted")
        .scrollIntoView({ behavior: "smooth", block: "center" });
      //console.log(selectedText);
    }
    if (key === "Backspace") {
      if (selectedText === 0) return;
      selectedText--;
    }
    if (key === "Escape") {
      isVisualOpen = false;
    }
  }
  function wordChosen(index) {
    if (highlighted === index) return (highlighted = -1);
    highlighted = index;
    // console.log(highlighted);
  }

  function onvisualitclicked() {
    loading = true;
    let highlightedWord = text[highlighted];
    // console.log("showing images for " + highlightedWord);
    // Send a POST request

    fetch(
      `https://api.pexels.com/v1/search?query=${highlightedWord}&per_page=1`,
      {
        headers: {
          authorization:
            "563492ad6f917000010000014dab6ad49fef4b1db8b62449c10249ce",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        loading = false;
        imageURL = data.photos[0].src.original;
      });

    isVisualOpen = true;
  }
  function sayWord() {
    let utterance = new SpeechSynthesisUtterance(text[highlighted]);
    utterance.rate = speechRate * 0.1;
    speechSynthesis.cancel();

    speechUtteranceChunker(utterance, speechRate);
    //speechSynthesis.speak(utterance);
  }
  function readFull() {
    let utterance = new SpeechSynthesisUtterance(text.join(" "));
    utterance.rate = speechRate * 0.1;
    speechSynthesis.cancel();
    speechUtteranceChunker(utterance, speechRate);
    //speechSynthesis.speak(utterance);
  }
  function spellthis() {
    for (let i = 0; i < text[highlighted].length; i++) {
      let utterance = new SpeechSynthesisUtterance(text[highlighted].charAt(i));
      utterance.rate = speechRate * 0.1;
      speechSynthesis.speak(utterance);
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div
  class=" bg-white {isVisualOpen
    ? ''
    : 'hidden'} shadow-lg  z-10  p-5 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border"
>
  <div class="text-right" on:click={() => (isVisualOpen = false)}>
    <i class="fas fa-times" />
  </div>
  <div class="p-3 w-full">
    {#if loading}
      <Jumper size="60" color="#FF3E00" unit="px" duration="1s" />
    {:else}
      <img src={imageURL} class=" rounded-lg max-w-xl" alt="" />
    {/if}

    <div class="text-3xl">{text[highlighted]}</div>
  </div>
</div>

<section
  class="grid grid-cols-3 {isVisualOpen ? 'blur-sm' : ''}
 bg-gray-800 h-screen text-white  "
>
  <div
    id="scrollcontainer"
    class="col-start-1 flex my-auto p-16 bg-white text-black w-full col-span-2  flex-wrap "
  >
    {#each text as word, index}
      {#if index === selectedText}
        <span
          on:click={() => wordChosen(index)}
          id="highlighted"
          class="spanbro bg-black rounded-3xl text-white p-2 cursor-pointer"
          style="margin:{marginValue}px;font-size: {fontValue}px;">{word}</span
        >
      {:else if highlighted === index}
        <span
          on:click={() => wordChosen(index)}
          id="highlighted"
          class="spanbro bg-yellow-300  rounded-3xl text-black p-2 cursor-pointer"
          style=" margin:{marginValue}px;font-size: {fontValue}px;">{word}</span
        >
      {:else}
        <span
          on:click={() => wordChosen(index)}
          class="spanbro cursor-pointer"
          style="margin:{marginValue}px;font-size: {fontValue}px;">{word}</span
        >
      {/if}
    {/each}
  </div>
  <div class="col-start-3 bg-gray-700 pt-16 px-6">
    <div class="fixed">
      <div>Course name</div>
      <div class="text-4xl font-bold mb-10">{courseTitle}</div>
      <hr class="mb-10" />
      <div class="flex items-center justify-between">
        <span class="text-3xl opacity-50 font-bold ">Options</span>
      </div>
      <div class="w-full mt-7">
        Font Size
        <input
          type="range"
          min="50"
          max="100"
          bind:value={fontValue}
          class="w-full"
          id="myRange"
        />
      </div>
      <div class="w-full mt-4">
        Font Spacing
        <input
          type="range"
          min="20"
          max="50"
          bind:value={marginValue}
          class="w-full"
          id="myRange"
        />
      </div>
      <div class="w-full mt-4">
        Speech Rate
        <input
          type="range"
          min="5"
          max="10"
          bind:value={speechRate}
          class="w-full"
          id="myRange"
        />
        {speechRate}
      </div>
      <div
        class="w-full p-4 m-5 cursor-pointer hover:text-black hover:bg-white transition-all mx-0 rounded-lg border"
        on:click={onvisualitclicked}
      >
        <i class="fas fa-glasses px-5 " />
        Visualize it
      </div>
      <div
        on:click={() => sayWord()}
        class="w-full p-4 m-5 hover:text-black cursor-pointer hover:bg-white transition-all mx-0 rounded-lg border"
      >
        <i class="fas fa-volume-up mx-5" />
        What is this word?
      </div>

      <div
        on:click={() => (readEachWordOut = !readEachWordOut)}
        class="w-full  p-4 m-5 hover:text-black cursor-pointer hover:bg-white transition-all mx-0 rounded-lg border {readEachWordOut
          ? 'bg-white text-black'
          : ''}"
      >
        <i class="fas fa-volume-up mx-5" />
        Read each word out
      </div>
      <div
        on:click={readFull}
        class="w-full p-4 m-5 hover:text-black cursor-pointer hover:bg-white transition-all mx-0 rounded-lg border"
      >
        <i class="fas fa-volume-up mx-5" />
        Read out everything
      </div>
      <div
        on:click={spellthis}
        class="w-full p-4 m-5 hover:text-black cursor-pointer hover:bg-white transition-all mx-0 rounded-lg border"
      >
        <i class="fas fa-volume-up mx-5" />
        Spell highlighted word
      </div>
    </div>
  </div>
</section>

<style>
  @font-face {
    font-family: od;
    src: url("assets/1.otf") format("opentype");
  }
  section {
    font-family: "od", serif;
  }
</style>
