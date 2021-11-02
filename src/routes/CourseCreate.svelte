<script>
  import { push, replace } from "svelte-spa-router";

  let titleSubmitted = false;
  let title = "";
  let titleID = "";
  let files;
  function nextClicked() {
    fetch("http://localhost:5000/add-course", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ title: title }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        titleID = data.id;
        titleSubmitted = true;
      });
  }
  function submit() {
    const formData = new FormData();
    console.log(files[0]);
    formData.append("file", files[0]);
    fetch(`http://localhost:5000/upload/${titleID}`, {
      method: "POST",
      body: formData,
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);
        if (data.message === "success") {
          alert("Uploaded Material");
        }
      });
  }
</script>

<div class="bg-gray-800 text-white">
  <div
    class="w-28 border-r absolute border-gray-700 h-screen flex flex-col items-center
    "
  >
    <div class="m-5">logo</div>
    <div
      on:click={() => replace("/teacher/course")}
      class="mt-12 w-full  p-4 text-center "
    >
      <i class="fas fa-home" />
    </div>
    <div class=" w-full  p-4 text-center border-r bg-gray-700">
      <i class="fas fa-book" />
    </div>

    <div class=" w-full mt-auto  p-4 text-center">logo</div>
  </div>

  <section class=" h-screen p-16 ml-28">
    <div>
      <div class="text-5xl mt-5">Add Course</div>
    </div>
    <div class="flex justify-center items-center h-2/3">
      <form
        class="bg-gray-700 p-10 rounded-xl {titleSubmitted
          ? 'hidden'
          : 'flex'} flex-col w-2/3 shadow-xl"
      >
        <input
          bind:value={title}
          type="text"
          placeholder="Title"
          class="bg-transparent border rounded-xl w-full p-3"
        />
        <button
          on:click={nextClicked}
          class="w-full p-3 rounded-3xl hover:bg-white hover:text-black transition-all mt-4 bg-gray-800"
        >
          Next
        </button>
      </form>

      <form
        on:submit={submit}
        class="  bg-gray-700 p-10 rounded-xl {titleSubmitted
          ? 'flex'
          : 'hidden'} flex-col w-2/3 shadow-xl"
      >
        <input type="file" bind:files />
        <button
          class="w-full p-3 rounded-3xl hover:bg-white hover:text-black transition-all mt-4 bg-gray-800"
        >
          Submit
        </button>
      </form>
    </div>
  </section>
</div>
