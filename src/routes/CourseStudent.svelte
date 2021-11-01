<script>
  import { onMount } from "svelte";
  import Card from "./Card.svelte";
  let courses = [{ id: -1, title: "test course" }];
  onMount(() => {
    fetch("http://localhost:5000/getallcourse", {
      method: "GET",
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);
        // TODO
        courses = data.courses;
        console.log(courses);
      });
  });
</script>

<div class="bg-gray-800 text-white">
  <div
    class="w-28 border-r absolute border-gray-700 h-screen flex flex-col items-center
    "
  >
    <div class="m-5">logo</div>
    <div class="mt-12 w-full  p-4 text-center border-r bg-gray-700">
      <i class="fas fa-home" />
    </div>

    <div class=" w-full mt-auto  p-4 text-center">logo</div>
  </div>

  <section class="gri h-screen p-16 ml-28">
    <div>
      <div class="text-5xl mt-5">All Courses</div>
    </div>
    <div class="grid grid-cols-3 gap-7 mt-10">
      {#if courses.length === 0}
        <div class="bg-gray-700 p-5 rounded-xl">No Courses loaded</div>
      {/if}

      {#each courses as course}
        <Card title={course.title} id={course.id} />
      {/each}
    </div>
  </section>
</div>
