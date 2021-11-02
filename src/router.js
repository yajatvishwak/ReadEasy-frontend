import SignUp from "./routes/SignUp.svelte";
import Login from "./routes/Login.svelte";
import Home from "./routes/Home.svelte";
import NotFound from "./routes/NotFound.svelte";
import CourseStudent from "./routes/CourseStudent.svelte";
import CourseTeacher from "./routes/CourseTeacher.svelte";
import CourseCreate from "./routes/CourseCreate.svelte";
import Canvas from "./routes/Canvas.svelte";

const routes = {
  // Exact path

  "/SignUp": SignUp,

  "/login": Login,
  "/student/course": CourseStudent,
  "/teacher/course": CourseTeacher,
  "/teacher/create": CourseCreate,
  "/course/:id": Home,
  "/draw": Canvas,

  //   // Using named parameters, with last being optional
  //   "/author/:first/:last?": Author,

  //   // Wildcard parameter
  //   "/book/*": Book,

  // navigate progammatically
  //     import {push, pop, replace} from 'svelte-spa-router'

  // // The push(url) method navigates to another page, just like clicking on a link
  // push('/book/42')

  // // The pop() method is equivalent to hitting the back button in the browser
  // pop()

  // // The replace(url) method navigates to a new page, but without adding a new entry in the browser's history stack
  // // So, clicking on the back button in the browser would not lead to the page users were visiting before the call to replace()
  // replace('/book/3')

  // Get params from url
  //     <p>Your name is: <b>{params.first}</b> <b>{#if params.last}{params.last}{/if}</b></p>
  // <script>
  // //You need to define the component prop "params"
  // export let params = {}
  // </script>

  // Catch-all
  // This is optional, but if present it must be the last
  "*": NotFound,
};

export default routes;
