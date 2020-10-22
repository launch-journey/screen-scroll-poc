;
import ffmpeg from 'ffmpeg';

export async function getScreenShots(context) {
  let files = undefined;

  try {
    let process = new ffmpeg('video/desktop-1.mp4');
    console.log('loading ffmpeg');
    process.then(
      function (video) {
        // Callback mode
        console.log('loaded ffmpeg');
        video.fnExtractFrameToJPG(
          'public/frames/desktop',
          {
            every_n_seconds: 0.1,
            file_name: 'example',
          },
          function (error, files) {
            console.log('error', error);

            if (!error) {
              console.log('Frames: ' + files);
            }

            return {
              props: {
                files,
              },
            };
          }
        );
      },
      function (err) {
        console.log('Error: ' + err);
      }
    );
  } catch (e) {
    console.log(e.code);
    console.log(e.msg);
  }
}
