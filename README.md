# edstem-transcript-creator

Chrome extension that creates transcripts from EdStem videos.

Install this locally in developer mode to use it.

1. Clone the repo
2. Turn on developer mode in Chrome
3. Add this unpacked directory

When viewing a video in EdStem, check the extension in Chrome and it should have the full transcript text.

NOTE: Make sure that captions are turned on on the video to get the full transcript.

# How does it work?

Whenever a connection is made to Kaltura regarding a `.srt` file, the file is downloaded within the extension and then parsed into plain text. Everything is saved in local sync storage so you don't have to worry about duplicates being pulled down for the same video.
