import React from "react";

const Blogs = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
            From The Blogs
          </h1>

          <p className="max-w-lg mx-auto mt-4 text-gray-500">
            Read our latest blogs
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
          <div>
            <div className="relative">
              <img
                className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                src="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt=""
              />

              <div className="absolute bottom-0 flex p-3 bg-white dark:bg-gray-900 ">
                <img
                  className="object-cover object-center w-10 h-10 rounded-full"
                  src="https://miro.medium.com/max/1400/1*L6VRj89-jxhxDp6NDOmYrA.png"
                  alt=""
                />

                <div className="mx-4">
                  <h1 className="text-sm text-gray-700 dark:text-gray-200">
                    Tom Hank
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Creative Director
                  </p>
                </div>
              </div>
            </div>

            <h1 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
              What are the different ways to manage a state in a React
              application?
            </h1>

            <hr className="w-32 my-6 text-blue-500" />

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Local (UI) state – Local state is data we manage in one or another
              component. Global (UI) state – Global state is data we manage
              across multiple components. Server state – Data that comes from an
              external server that must be integrated with our UI state. URL
              state – Data that exists on our URLs, including the pathname and
              query parameters.
            </p>
          </div>

          <div>
            <div className="relative">
              <img
                className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                src="https://miro.medium.com/max/1042/1*ULmG2uiAlgQksjj-brp2fw.jpeg"
                alt=""
              />

              <div className="absolute bottom-0 flex p-3 bg-white dark:bg-gray-900 ">
                <img
                  className="object-cover object-center w-10 h-10 rounded-full"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  alt=""
                />

                <div className="mx-4">
                  <h1 className="text-sm text-gray-700 dark:text-gray-200">
                    arthur melo
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Creative Director
                  </p>
                </div>
              </div>
            </div>

            <h1 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
              How does prototypical inheritance work?
            </h1>

            <hr className="w-32 my-6 text-blue-500" />

            <p className="text-sm text-gray-500 dark:text-gray-400">
              The Prototypal Inheritance is a feature in javascript used to add
              methods and properties in objects. It is a method by which an
              object can inherit the properties and methods of another object.
              Traditionally, in order to get and set the [[Prototype]] of an
              object, we use Object. getPrototypeOf and Object.
            </p>
          </div>

          <div>
            <div className="relative">
              <img
                className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                src="https://miro.medium.com/max/1280/1*vWjgJkpMrS0iC-Hd666Mfg.png"
                alt=""
              />

              <div className="absolute bottom-0 flex p-3 bg-white dark:bg-gray-900 ">
                <img
                  className="object-cover object-center w-10 h-10 rounded-full"
                  src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                  alt=""
                />

                <div className="mx-4">
                  <h1 className="text-sm text-gray-700 dark:text-gray-200">
                    Amelia. Anderson
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Lead Developer
                  </p>
                </div>
              </div>
            </div>

            <h1 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
              What is a unit test? Why should we write unit tests?
            </h1>

            <hr className="w-32 my-6 text-blue-500" />

            <p className="text-sm text-gray-500 dark:text-gray-400">
              The main objective of unit testing is to isolate written code to
              test and determine if it works as intended. Unit testing is an
              important step in the development process, because if done
              correctly, it can help detect early flaws in code which may be
              more difficult to find in later testing stages.
            </p>
          </div>

          <div>
            <div className="relative">
              <img
                className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                src="https://www.techmagic.co/blog/content/images/2021/06/Inner-01.-React-vs-Angular-vs-Vue.js.-Introduction@2x.png"
                alt=""
              />

              <div className="absolute bottom-0 flex p-3 bg-white dark:bg-gray-900 ">
                <img
                  className="object-cover object-center w-10 h-10 rounded-full"
                  src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                  alt=""
                />

                <div className="mx-4">
                  <h1 className="text-sm text-gray-700 dark:text-gray-200">
                    Amelia. Anderson
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Lead Developer
                  </p>
                </div>
              </div>
            </div>

            <h1 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
              React vs. Angular vs. Vue?
            </h1>

            <hr className="w-32 my-6 text-blue-500" />

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Vue provides higher customizability and hence is easier to learn
              than Angular or React. Further, Vue has an overlap with Angular
              and React with respect to their functionality like the use of
              components. Hence, the transition to Vue from either of the two is
              an easy option.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
