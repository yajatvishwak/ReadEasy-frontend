<script>
    let fontValue = 50;
    let selectedText = 0;
    let marginValue = 10;
    let text =
        "Aa chal bhaag, chalen kahin aa Jahan raat, katein wahi aa Ek saath, palein halaat Aa chal bhaag, chalen kahin aa Jahan raat, katein wahi aa Ek saath, palein halaat How could you leave-leave-leave Dhin tirikit dha-dha-dha How could you leave Din tere bin na How could you leave-leave-leave Dhin tirikit dha-dha-dha How could you leave-leave-leave Din tere bin na".split(
            " "
        );
    function handleKeydown(event) {
        console.log(event.key);
        let key = event.key;
        if (key === "Enter") {
            if (selectedText === text.length - 1) return;
            selectedText++;

            // document.getElementById("scrollcontainer").scrollLeft += document
            //     .getElementsByClassName("spanbro")
            //     [selectedText].getBoundingClientRect().width;
            document
                .getElementById("highlighted")
                .scrollIntoView({ behavior: "smooth", block: "center" });
            console.log(selectedText);
        }
        if (key === "Backspace") {
            if (selectedText === 0) return;
            selectedText--;
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<section class="grid grid-cols-3 bg-gray-800 h-screen text-white p ">
    <div
        id="scrollcontainer"
        class="col-start-1 flex my-auto p-16 bg-white text-black w-full col-span-2  flex-wrap "
    >
        {#each text as word, index}
            {#if index === selectedText}
                <span
                    id="highlighted"
                    class="spanbro bg-black text-white p-2"
                    style=" margin:{marginValue}px;font-size: {fontValue}px;"
                    >{word}</span
                >
            {:else}
                <span
                    class="spanbro"
                    style="margin:{marginValue}px;font-size: {fontValue}px;"
                    >{word}</span
                >
            {/if}
        {/each}
    </div>
    <div class="col-start-3 bg-gray-700 pt-16 px-6">
        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold ">Options</span>
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
    </div>
</section>
