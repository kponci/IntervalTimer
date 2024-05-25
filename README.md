# Interval Timer

In my application, it will be possible to create, edit, and run interval timers. An interval timer will consist of a sequence of simple timers. The application will be divided into three sections: Run, Edit, Others. Users will be able to switch between these pages using the top navigation. The implementation will likely be a single page with dynamic content (I probably won't create a separate page for each window).

## Run page
On the Run page, there will be all the information regarding the name of the interval timer, the name of the currently running simple timer, the total remaining time, the elapsed time, and the name of the next simple timer in the sequence. The page will also include buttons to start/stop the timer and to move back/forward to the previous/next simple timer, or move back/forward by 10 seconds.

## Edit page
On the Edit page, there will be an option to add simple timers and rearrange their order. There will also be options to edit the name and time of each simple timer.

## Others page
On the Others page, all other interval timers that the user has created will be displayed. Users will have the ability to edit their names, copy them, and delete them. I would also like to implement the ability to create an account and log in so that users' interval timers are synchronized with a server. This would require expanding the application to include a web backend and a database. I don't have experience with this yet and I'm not sure how challenging it is, so I'm leaving this feature as optional.

## TODO
### Run tab
1. Extend basic timer to Interval timer, give it field Name
2. Add name to each basic timer
3. Show name current name of the basic timer instead of Run timer header
4. Style the buttons Play/Stop, Move forward/backward 10 seconds, Move 1 basic timer back/forth
5. Implement behavior of the buttons

### Edit tab
1. show each basic timer name together with the time in a column
2. implement changing of the name of the basic timers (reusage in **Others** tab)
3. implement changing of the time of the basic timers
4. implement adding of the basic timers - add a new field in the column (reusage in **Others** tab)
5. implement moving the timers drag-n-drop style