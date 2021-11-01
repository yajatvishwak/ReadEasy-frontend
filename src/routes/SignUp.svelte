<script>
    let email = "";
    let password = "";
    let username="";
    let role="";

    function signup(event) {
      event.preventDefault();
      const payload = JSON.stringify({
        email: email,
        password: password,
        username:username,
        role:role
      });
      console.log(payload);
      fetch("http://localhost:5000/signup", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: payload,
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log(data);
          
        });
    }
  </script>

<body>
    <section class="text-white">
        <div class="mt-40  flex flex-col items-left bg-white">
            <div
                class="ml-64 flex flex-col bg-white border border-grey rounded-md px-4 sm:px-6 md:px-8 lg:px-10 py-8  w-full max-w-md"
            >
                <div
                    class="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800"
                >
                    Sign-Up
                </div>

                <div class="mt-10">
                    <form action="#">
                        

                        <div class="mt-10">
                            <form on:submit={signup}>
                                <div class="flex flex-col mb-6">
                                    <label
                                        for="name"
                                        class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                                        >Name:</label
                                    >
                                    <div class="relative">
                                        <div
                                            class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                                        >
                                            <img
                                                class="h-7 w-7"
                                                src="./assets/name-icon.png"
                                                alt=""
                                            />
                                        </div>
        
                                        <input
                                        bind:value={username}
                                            id="username"
                                            type="name"
                                            name="username"
                                            class="text-sm text-black sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                            placeholder="Name"
                                        />
                                    </div>
                                </div>
                                <div class="flex flex-col mb-6">
                                    <label
                                        for="email"
                                        class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                                        >E-Mail Address:</label
                                    >
                                    <div class="relative">
                                        <div
                                            class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                                        >
                                            <svg
                                                class="h-6 w-6"
                                                fill="none"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                                />
                                            </svg>
                                        </div>

                                        <input
                                            bind:value={email}
                                            id="email"
                                            type="email"
                                            name="email"
                                            class="text-sm text-black sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                            placeholder="E-Mail Address"
                                        />
                                    </div>
                                </div>
                                <div class="flex flex-col mb-6">
                                    <label
                                        for="password"
                                        class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                                        >Password:</label
                                    >
                                    <div class="relative">
                                        <div
                                            class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400"
                                        >
                                            <span>
                                                <svg
                                                    class="h-6 w-6"
                                                    fill="none"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                    />
                                                </svg>
                                            </span>
                                        </div>

                                        <input
                                        bind:value={password}
                                            id="password"
                                            type="password"
                                            name="password"
                                            class="text-sm text-black sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                            placeholder="Password"
                                        />
                                    </div>
                                </div>
                                <div class="flex w-5 mb-7">
                                    <span
                                        class="mb-1 pr-5 text-xs sm:text-sm tracking-wide text-gray-600"
                                    >
                                        Role:</span
                                    >

                                    <div class="">
                                        
                                        
                                        <label
                                            class="flex items-center justify-center ml-5 mr-5 focus:outline-none text-black text-sm sm:text-base  rounded  w-full transition duration-150 ease-in"
                                        >
                                            <input
                                            bind:group={role}
                                                type="radio"
                                                class="form-radio"
                                                name="role"
                                                value={"teacher"}
                                            />
                                            <span class="ml-2">Teacher</span>
                                        </label>
                                        <label
                                            class="flex items-center justify-center ml-5 mr-5 focus:outline-none text-black text-sm sm:text-base  rounded w-full transition duration-150 ease-in"
                                        >
                                            <input
                                            bind:group={role}
                                                type="radio"
                                                class="form-radio"
                                                name="role"
                                                value={"student"}
                                            />
                                            <span class="ml-2">Student</span>
                                        </label>
                                    </div>
                                </div>

                                <div class="flex w-full">
                                    <button
                                        type="submit"
                                        class="flex items-center bg-lightgreen justify-center focus:outline-none text-white text-sm sm:text-base bg-lightpurple hover:bg-darkpurple rounded py-2 w-full transition duration-150 ease-in"
                                    >
                                        <span class="mr-2 uppercase"
                                            >Sign-Up</span
                                        >
                                        <span>
                                            <svg
                                                class="h-6 w-6"
                                                fill="none"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <img
            class="absolute bottom-0 right-0 h-l w-1 "
            src="./assets/Sign-up-page-character.png"
            alt=""
        />
    </section>
</body>

<style>
    .w-5 {
        width: 40%;
    }
    .w-1 {
        width: 40%;
    }

    .h-l {
        height: 60%;
    }
</style>
