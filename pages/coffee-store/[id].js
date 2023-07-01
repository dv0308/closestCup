import { useRouter } from "next/router";
import cls from "classnames";
import styles from "../../styles/coffee-store.module.css";
import CoffeeStoreData from "../../data/coffee-stores.json";
import { isEmpty } from "../../utils";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { fetchCoffeeStore } from "../../lib/coffee-store";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../_app";

export async function getStaticProps(staticProps) {
  const CoffeeStore = await fetchCoffeeStore();
  //console.log({ CoffeeStore });
  const { params } = staticProps;
  const foundCoffeeStoreById = CoffeeStore.find((cfs) => {
    return cfs.fsq_id === params.id;
  });
  //console.log({ CoffeeStore });
  //console.log(CoffeeStore);
  //   console.log(staticProps);

  //console.log(params);
  return {
    props: {
      coffeeStore: foundCoffeeStoreById ? foundCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const CoffeeStore = await fetchCoffeeStore();
  console.log(CoffeeStore);
  const paths = CoffeeStore.map((cfs) => {
    return {
      params: {
        id: cfs.fsq_id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (initialProps) => {
  //console.log(props);

  console.log(initialProps.coffeeStore);
  const router = useRouter();
  const id = router.query.id;

  let [coffeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);
  // const { dispatch, state } = useContext(StoreContext);
  // const { coffeeStores, lat, lng } = state;
  console.log(coffeeStores);

  useEffect(() => {
    if (isEmpty(initialProps.coffeStore)) {
      if (coffeeStores.length > 0) {
        console.log("hiiihh");
        const findCoffeeStoreById = coffeeStores.find((cfs) => {
          return cfs.fsq_id === id;
        });
        setCoffeeStore(findCoffeeStoreById);
      }
    }
  }, [id]);

  //const id = router.query.id;
  if (router.isFallback) {
    return <div>LOADIN...</div>;
  }

  const { name, location, imgUrl } = coffeStore;
  const upvoteButtonHandler = () => {
    console.log("UPVOTED!!!");
  };

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <div id="pano"></div>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">⬅️ Back to home</Link>
          </div>
          <div className={styles.nameWrapper}></div>
          <h1 className={styles.name}>{name}</h1>
          <Image
            alt="coffe-store-image"
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
            }
            width={600}
            height={360}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width={24}
              height={24}
              alt="icon-image"
            />
            <p className={styles.text}>
              {location.address || location.formatted_address}
            </p>
          </div>
          {location.cross_street && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width={24}
                height={24}
                alt="icon-image"
              />
              <p className={styles.text}>{location.cross_street}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width={24}
              height={24}
              alt="icon-image"
            />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={upvoteButtonHandler}>
            UpVote!!
          </button>
        </div>
      </div>
    </div>
  );
};
export default CoffeeStore;
