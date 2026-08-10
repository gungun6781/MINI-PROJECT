document.addEventListener("DOMContentLoaded", function () {

    let user = JSON.parse(localStorage.getItem("studentUser")) || {
        name: "GUNGUN",
        studentId: "2510990874",
        course: "B.Tech CSE",
        semester: "3",
        email: "gungun@email.com",
        phone: "+91 XXXXX XXXXX",
        password: "123456"
    };

    let enrolledCourses = JSON.parse(
        localStorage.getItem("enrolledCourses") || "[]"
    );


    function saveUser() {
        localStorage.setItem("studentUser", JSON.stringify(user));
    }


    function message(text) {
        alert(text);
    }


    function goTo(id) {
        const section = document.querySelector(id);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth"
            });
        }
    }


    /* ================= LOGIN ================= */

    const loginForm = document.querySelector("#login form");

    if (loginForm) {

        loginForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const emailInput =
                loginForm.querySelector('input[type="email"]');

            const passwordInput =
                loginForm.querySelector('input[type="password"]');

            const email = emailInput.value.trim();
            const password = passwordInput.value;

            if (email === "" || password === "") {
                message("Please enter email and password.");
                return;
            }

            if (
                email === user.email &&
                password === user.password
            ) {

                localStorage.setItem("isLoggedIn", "true");

                message(
                    "Login successful!\nWelcome " +
                    user.name + "!"
                );

                loginForm.reset();

                goTo("#dashboard");

            } else {

                message(
                    "Invalid email or password."
                );
            }
        });
    }


    /* ================= REGISTER ================= */

    const registerForm =
        document.querySelector("#register form");

    if (registerForm) {

        registerForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const inputs =
                registerForm.querySelectorAll("input");

            const select =
                registerForm.querySelector("select");

            const name =
                inputs[0].value.trim();

            const email =
                inputs[1].value.trim();

            const phone =
                inputs[2].value.trim();

            const dob =
                inputs[3].value;

            const course =
                select.value;

            const password =
                inputs[4].value;

            const confirmPassword =
                inputs[5].value;


            if (
                name === "" ||
                email === "" ||
                phone === "" ||
                dob === "" ||
                course === "Select Course" ||
                password === "" ||
                confirmPassword === ""
            ) {

                message(
                    "Please fill all registration fields."
                );

                return;
            }


            if (password !== confirmPassword) {

                message(
                    "Password and Confirm Password do not match."
                );

                return;
            }


            user = {

                name: name,

                studentId:
                    "STU" +
                    Math.floor(
                        100000 +
                        Math.random() * 900000
                    ),

                course: course,

                semester: "3",

                email: email,

                phone: phone,

                password: password
            };


            saveUser();

            registerForm.reset();

            message(
                "Registration successful!\nPlease login now."
            );

            goTo("#login");
        });
    }


    /* ================= REGISTER HERE ================= */

    const registerLink =
        document.querySelector("#login form p a");

    if (registerLink) {

        registerLink.addEventListener("click", function (e) {

            e.preventDefault();

            goTo("#register");
        });
    }


    /* ================= FORGOT PASSWORD ================= */

    const forgotPassword =
        document.querySelector("#login form > a");

    if (forgotPassword) {

        forgotPassword.addEventListener("click", function (e) {

            e.preventDefault();

            const email =
                prompt("Enter your registered email:");

            if (email === null) {
                return;
            }

            if (email.trim() === user.email) {

                message(
                    "Your password is:\n" +
                    user.password
                );

            } else {

                message(
                    "This email is not registered."
                );
            }
        });
    }


    /* ================= PROFILE ================= */

    function updateProfile() {

        const paragraphs =
            document.querySelectorAll(
                "#profile .profile-card p"
            );

        if (paragraphs.length >= 6) {

            paragraphs[0].innerHTML =
                "<b>Name:</b> " + user.name;

            paragraphs[1].innerHTML =
                "<b>Student ID:</b> " +
                user.studentId;

            paragraphs[2].innerHTML =
                "<b>Course:</b> " +
                user.course;

            paragraphs[3].innerHTML =
                "<b>Semester:</b> " +
                user.semester;

            paragraphs[4].innerHTML =
                "<b>Email:</b> " +
                user.email;

            paragraphs[5].innerHTML =
                "<b>Phone:</b> " +
                user.phone;
        }
    }

    updateProfile();


    /* ================= EDIT PROFILE ================= */

    const editForm =
        document.querySelector("#edit-profile form");


    function loadEditProfile() {

        if (!editForm) {
            return;
        }

        const inputs =
            editForm.querySelectorAll("input");

        inputs[0].value = user.name;
        inputs[1].value = user.studentId;
        inputs[2].value = user.course;
        inputs[3].value = user.semester;
        inputs[4].value = user.email;
        inputs[5].value = user.phone;
    }


    loadEditProfile();


    if (editForm) {

        editForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const inputs =
                editForm.querySelectorAll("input");


            if (
                inputs[0].value.trim() === "" ||
                inputs[1].value.trim() === "" ||
                inputs[2].value.trim() === "" ||
                inputs[3].value.trim() === "" ||
                inputs[4].value.trim() === "" ||
                inputs[5].value.trim() === ""
            ) {

                message(
                    "Please fill all profile fields."
                );

                return;
            }


            user.name =
                inputs[0].value.trim();

            user.studentId =
                inputs[1].value.trim();

            user.course =
                inputs[2].value.trim();

            user.semester =
                inputs[3].value.trim();

            user.email =
                inputs[4].value.trim();

            user.phone =
                inputs[5].value.trim();


            saveUser();

            updateProfile();

            message(
                "Profile saved successfully!"
            );
        });
    }


    /* ================= EDIT PROFILE BUTTON ================= */

    const editButton =
        document.querySelector(
            "#profile .profile-card button"
        );

    if (editButton) {

        editButton.addEventListener("click", function () {

            loadEditProfile();

            goTo("#edit-profile");

            message(
                "Edit Profile section opened."
            );
        });
    }


    /* ================= COURSE ENROLLMENT ================= */

    const courseTable =
        document.querySelector(
            "#course-enrollment table"
        );


    function saveCourses() {

        localStorage.setItem(
            "enrolledCourses",
            JSON.stringify(enrolledCourses)
        );
    }


    function updateCourseButtons() {

        if (!courseTable) {
            return;
        }


        const rows =
            courseTable.querySelectorAll(
                "tr:not(:first-child)"
            );


        rows.forEach(function (row) {

            const courseName =
                row.children[0]
                    .textContent
                    .trim();

            const button =
                row.querySelector("button");


            if (!button) {
                return;
            }


            if (
                enrolledCourses.includes(
                    courseName
                )
            ) {

                button.textContent =
                    "Unenroll";

                button.style.background =
                    "#E0218A";

            } else {

                button.textContent =
                    "Enroll";

                button.style.background =
                    "#28A745";
            }

            button.disabled = false;
        });
    }


    if (courseTable) {

        const courseRows =
            courseTable.querySelectorAll(
                "tr:not(:first-child)"
            );


        courseRows.forEach(function (row) {

            const button =
                row.querySelector("button");


            if (!button) {
                return;
            }


            button.addEventListener(
                "click",
                function (e) {

                    e.stopPropagation();


                    const courseName =
                        row.children[0]
                            .textContent
                            .trim();


                    if (
                        enrolledCourses.includes(
                            courseName
                        )
                    ) {


                        const confirmUnenroll =
                            confirm(
                                "Do you want to unenroll from " +
                                courseName +
                                "?"
                            );


                        if (!confirmUnenroll) {
                            return;
                        }


                        enrolledCourses =
                            enrolledCourses.filter(
                                function (course) {

                                    return course !==
                                        courseName;
                                }
                            );


                        saveCourses();


                        message(
                            "You have been unenrolled from " +
                            courseName +
                            "."
                        );


                    } else {


                        enrolledCourses.push(
                            courseName
                        );


                        saveCourses();


                        message(
                            "Successfully enrolled in " +
                            courseName +
                            "!"
                        );
                    }


                    updateCourseButtons();

                    updateCourseCount();
                }
            );
        });


        updateCourseButtons();
    }


    /* ================= COURSE SEARCH ================= */

    const searchInput =
        document.querySelector(
            ".search-box input"
        );

    const searchButton =
        document.querySelector(
            ".search-box button"
        );


    if (
        searchInput &&
        searchButton &&
        courseTable
    ) {

        searchButton.addEventListener(
            "click",
            function () {

                const search =
                    searchInput.value
                        .trim()
                        .toLowerCase();


                const rows =
                    courseTable.querySelectorAll(
                        "tr:not(:first-child)"
                    );


                let found = false;


                rows.forEach(function (row) {

                    const courseName =
                        row.children[0]
                            .textContent
                            .toLowerCase();


                    if (
                        search === "" ||
                        courseName.includes(search)
                    ) {

                        row.style.display =
                            "";

                        found = true;

                    } else {

                        row.style.display =
                            "none";
                    }
                });


                if (search === "") {

                    message(
                        "Showing all courses."
                    );

                } else if (found) {

                    message(
                        "Course found."
                    );

                } else {

                    message(
                        "No course found."
                    );
                }
            }
        );
    }


    /* ================= DASHBOARD COURSE COUNT ================= */

    function updateCourseCount() {

        const card =
            document.querySelector(
                ".cards .card:first-child p"
            );


        if (card) {

            card.textContent =
                8 + enrolledCourses.length;
        }
    }


    updateCourseCount();


    /* ================= DOWNLOAD RESULT ================= */

    const resultButton =
        document.querySelector(
            "#marks-result button"
        );


    if (resultButton) {

        resultButton.addEventListener(
            "click",
            function () {

                const result =
                    "STUDENT RESULT\n\n" +
                    "Name: " +
                    user.name +
                    "\n" +
                    "Student ID: " +
                    user.studentId +
                    "\n" +
                    "Course: " +
                    user.course +
                    "\n" +
                    "Semester: " +
                    user.semester +
                    "\n\n" +
                    "Programming: 90 - O\n" +
                    "Database: 93 - O\n" +
                    "Maths: 95 - O\n\n" +
                    "Result: PASS";


                const file =
                    new Blob(
                        [result],
                        {
                            type:
                                "text/plain"
                        }
                    );


                const url =
                    URL.createObjectURL(file);


                const link =
                    document.createElement(
                        "a"
                    );


                link.href = url;

                link.download =
                    "Student_Result.txt";


                document.body.appendChild(
                    link
                );

                link.click();

                document.body.removeChild(
                    link
                );


                URL.revokeObjectURL(
                    url
                );


                message(
                    "Result downloaded successfully!"
                );
            }
        );
    }


    /* ================= PAY NOW ================= */

    const payButton =
        document.querySelector(
            "#fees-details button"
        );


    function updateFeeStatus() {

        if (
            localStorage.getItem(
                "libraryFeePaid"
            ) === "true"
        ) {

            const rows =
                document.querySelectorAll(
                    "#fees-details table tr"
                );


            rows.forEach(function (row) {

                if (
                    row.children[0] &&
                    row.children[0]
                        .textContent
                        .trim() ===
                    "Library Fee"
                ) {

                    row.children[2]
                        .textContent =
                        "Paid";
                }
            });
        }
    }


    updateFeeStatus();


    if (payButton) {

        payButton.addEventListener(
            "click",
            function () {


                if (
                    localStorage.getItem(
                        "libraryFeePaid"
                    ) === "true"
                ) {

                    message(
                        "Library Fee is already paid."
                    );

                    return;
                }


                const confirmPayment =
                    confirm(
                        "Library Fee: ₹2000\n\n" +
                        "Do you want to pay now?"
                    );


                if (!confirmPayment) {

                    message(
                        "Payment cancelled."
                    );

                    return;
                }


                localStorage.setItem(
                    "libraryFeePaid",
                    "true"
                );


                updateFeeStatus();


                message(
                    "Payment successful!\n" +
                    "₹2000 has been paid."
                );
            }
        );
    }


    /* ================= DASHBOARD SIDEBAR ================= */

    const sidebarLinks =
        document.querySelectorAll(
            ".sidebar a"
        );


    sidebarLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (e) {

                e.preventDefault();


                const text =
                    link.textContent
                        .trim()
                        .toLowerCase();


                if (text === "profile") {

                    goTo("#profile");


                } else if (text === "courses") {

                    goTo("#course-enrollment");


                } else if (text === "attendance") {

                    goTo("#attendance");


                } else if (text === "marks") {

                    goTo("#marks-result");


                } else if (text === "fees") {

                    goTo("#fees-details");


                } else if (text === "timetable") {

                    goTo("#time-table");


                } else if (text === "logout") {


                    const confirmLogout =
                        confirm(
                            "Are you sure you want to logout?"
                        );


                    if (confirmLogout) {

                        localStorage.setItem(
                            "isLoggedIn",
                            "false"
                        );


                        message(
                            "Logout successful!"
                        );


                        goTo("#login");
                    }
                }
            }
        );
    });


    /* ================= NAVIGATION ================= */

    const navLinks =
        document.querySelectorAll(
            "nav a"
        );


    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (e) {

                const target =
                    link.getAttribute(
                        "href"
                    );


                if (
                    target &&
                    target.startsWith("#") &&
                    document.querySelector(
                        target
                    )
                ) {

                    e.preventDefault();

                    goTo(target);
                }
            }
        );
    });


    /* ================= TABLE CLICK ================= */

    const tables =
        document.querySelectorAll(
            "#attendance table, " +
            "#marks-result table, " +
            "#fees-details table, " +
            "#time-table table"
        );


    tables.forEach(function (table) {

        const rows =
            table.querySelectorAll(
                "tr:not(:first-child)"
            );


        rows.forEach(function (row) {

            row.addEventListener(
                "click",
                function () {

                    let values = [];


                    row.querySelectorAll(
                        "td"
                    ).forEach(
                        function (cell) {

                            values.push(
                                cell.textContent
                                    .trim()
                            );
                        }
                    );


                    message(
                        "Selected Record:\n\n" +
                        values.join(
                            " | "
                        )
                    );
                }
            );
        });
    });

});