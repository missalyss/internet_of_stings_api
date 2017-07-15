
# To Run Pi on Own
After Pi is configured with SSH, ssh into it via the terminal
`$ ssh pi@172.20.10.2`
and sign in with Pi's password ( `honey_pi` )
To edit .py file, in terminal run
`$ nano <YOUR_FILE_NAME>.py`

You can touch a script in, echo the full pathname for running your file (with the while loop in it) and enter this command to start running in the background.
`$ /home/pi/honey_pi/script.sh & disown`

Want to disconnect running in background?
`$ ps ax | grep <YOUR_FILE_NAME>.py`
Identify the number next to the far left of the command running your file (the command with a `grep --color=auto` is the `ps ax` command you just ran to find the file)
`$ kill <4_DIGIT_NUMBER>`

To get out of the Pi's terminal:
`$ logout`
