import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useEffect} from "react";

export async function getStaticProps(context) {

  return {
    props: {
      frames: 369
    },
  };
}

export default function Home({frames}) {



  useEffect(()=>{

      const html = document.documentElement;
      const canvas = document.getElementById("example");
      const context = canvas.getContext("2d");

      const frameCount = frames;
      const currentFrame = index => (
          `/frames/example_${index.toString()}.jpg`
      )

      const preloadImages = () => {
          for (let i = 1; i < frameCount; i++) {
              const img = new Image();
              img.src = currentFrame(i);
          }
      };

      const img = new Image()
      img.src = currentFrame(1);
      canvas.width=2400;
      canvas.height=1500;
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);

      img.onload=function(){
          context.drawImage(img, 0, 0);
      }

      const updateImage = index => {
          img.src = currentFrame(index);
          context.drawImage(img, 0, 0);
      }

      window.addEventListener('scroll', () => {
          const scrollTop = html.scrollTop;
          const maxScrollTop = html.scrollHeight - window.innerHeight;
          const scrollFraction = scrollTop / maxScrollTop;
          const frameIndex = Math.min(
              frameCount - 1,
              Math.ceil(scrollFraction * frameCount)
          );

          requestAnimationFrame(() => updateImage(frameIndex + 1))
      });

      preloadImages()



  },[])

  return (
    <div className={styles.container}>
      <Head>
        <title>screen-scroll-poc</title>
          <description>example of image based scrolling experience</description>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <canvas id="example" className={styles.canvas} style={{width: "100vw", height:"100vh"}}>

        </canvas>

      </main>
    </div>
  );
}
