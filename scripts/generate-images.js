import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ffprobe from 'ffprobe';
import ffprobeStatic from 'ffprobe-static';
import ffmpeg from "ffmpeg";

export async function getScreenShots(context) {


    let files = undefined;

    try {

        let process = new ffmpeg('video/desktop-1.mp4');
        console.log('loading ffmpeg');
        process.then(function (video) {
            // Callback mode
            console.log('loaded ffmpeg');
            video.fnExtractFrameToJPG('public/frames/desktop', {
                every_n_seconds : 0.1,
                file_name : 'example'
            }, function (error, files) {

                console.log('error', error);

                if (!error) {
                    console.log('Frames: ' + files);
                }

                return {
                    props: {
                        files
                    },
                };

            });
        }, function (err) {
            console.log('Error: ' + err);
        });
    } catch (e) {
        console.log(e.code);
        console.log(e.msg);
    }


    return {
        props: {
            duration
        },
    };
}

export default function Home({duration}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>

                <p className={styles.description}>
                    Generating images
                    <pre>
            {JSON.stringify(duration, null, 2)}
          </pre>
                </p>
        </div>
);
}
