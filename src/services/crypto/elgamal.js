import * as JSBN from 'jsbn'
import * as Utils from '../utils/utils'

const BigInt = JSBN.BigInteger;



export async function generateKeyPairAsync(primeBits = 2048) {
    return new Promise(async (resolve, reject) => {
      try {

        let qBigInt;
        let pBigInt;

        do {
          qBigInt = await Utils.getBigPrimeAsync(primeBits - 1);
          pBigInt = qBigInt.shiftLeft(1).add(BigInt.ONE);
        } while (!pBigInt.isProbablePrime()); // Ensure that p is a prime

        let gBigInt;
        do {
          // Avoid g=2 because of Bleichenbacher's attack
          gBigInt = await Utils.getRandomBigIntAsync(new BigInt('3'), pBigInt);
        } while (
          gBigInt.modPowInt(2, pBigInt).equals(BigInt.ONE) ||
          gBigInt.modPow(qBigInt, pBigInt).equals(BigInt.ONE) ||
          // g|p-1
          pBigInt.subtract(BigInt.ONE).remainder(gBigInt).equals(BigInt.ZERO) ||
          // g^(-1)|p-1 (evades Khadir's attack)
          pBigInt.subtract(BigInt.ONE).remainder(gBigInt.modInverse(pBigInt)).equals(BigInt.ZERO)
          );

        // Generate private key
        const skBigInt = await Utils.getRandomBigIntAsync(
          this.Utils.BIG_TWO,
          pBigInt.subtract(BigInt.ONE)
        );

        // Generate public key
        const ABigInt = gBigInt.modPow(skBigInt, pBigInt);

        console.log("\nPrivate Key Sk =", skBigInt.toString(10), "\n"); // PRIVATE KEY IS KEPT SECRET

        console.log("Public Key Pk =", {
          pBigInt: pBigInt.toString(10),
          gBigInt: gBigInt.toString(10),
          ABigInt: ABigInt.toString(10)
        }, "\n"); // PUBLIC KEY IS MADE PUBLIC

        resolve({pBigInt, gBigInt, ABigInt, skBigInt});

      } catch (e) {
        reject(e)
      }
    })
  };



export async function encryptMessage(m, pBigInt, gBigInt, ABigInt) {
    return new Promise(async (resolve, reject) => {
      try {

        const mBigInt = new BigInt(m.toString(), 10);

        const kBigInt = await Utils.getRandomNbitBigIntAsync(2048); // EPHEMERAL KEY

        // console.log("Ephemeral Key k = ", kBigInt.toString(10) + "\n");

        let c1BigInt = gBigInt.modPow(kBigInt, pBigInt);// CIPHERTEXT 1

        let c2BigInt;

        c2BigInt = mBigInt.multiply(ABigInt.modPow(kBigInt, pBigInt)).remainder(pBigInt); // CIPHERTEXT 2

        // console.log("Ciphertext (c1, c2) =", c1BigInt.toString(10), c2BigInt.toString(10), "\n");

        resolve({c1BigInt, c2BigInt, kBigInt})

      } catch (e) {
        reject(e)
      }
    })
  };

export function decryptMessage(c1, c2, sk, p){

    const c1BigInt = new BigInt(c1);
    const c2BigInt = new BigInt(c2);
    const skBigInt = new BigInt(sk);
    const pBigInt = new BigInt(p);

    let plaintext = c1BigInt.modPow(skBigInt, pBigInt).modInverse(pBigInt).multiply(c2BigInt).remainder(pBigInt);

    return(plaintext.toString(10));
}


export function aggregateData(orientationDataSet){

  let C1 = new BigInt(1);
  let C2 = new BigInt(1);

  orientationDataSet.forEach((dataPoint) => {

    C1 = C1.multiply(new BigInt(dataPoint.c1));
    C2 = C2.multiply(new BigInt(dataPoint.c2));

  });

  return({
    c1: C1.toString(10),
    c2: C2.toString(10)
  })
}

export function generateValidPlaintextsList(dataPointsCount){

  const validDataPoints = [2, 3];

  let validPlaintextsList = [];

  for(let i = 0; i < dataPointsCount; i++){

    if (i === 0){
      validPlaintextsList.push(validDataPoints)
    } else {
      let validPlaintexts = [];
      validPlaintextsList[validPlaintextsList.length -1].forEach((plaintext) => {
        validDataPoints.forEach((value) => {
          validPlaintexts.push(plaintext * value)
        })
      });
      validPlaintextsList.push(validPlaintexts)
    }
  }

  console.log(validPlaintextsList);

  console.log(validPlaintextsList[validPlaintextsList.length -1])

  return validPlaintextsList[validPlaintextsList.length -1]

}




