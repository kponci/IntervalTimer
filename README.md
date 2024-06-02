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
- 

### Edit tab