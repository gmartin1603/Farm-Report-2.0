import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCelAccvshw9mbBgJ_T55yao6tBuy7zLVo",
    authDomain: "farm-report-86ac2.firebaseapp.com",
    projectId: "farm-report-86ac2",
    storageBucket: "farm-report-86ac2.appspot.com",
    messagingSenderId: "1035453646204",
    appId: "1:1035453646204:web:0afc537ef2d4c3e36410f9",
    measurementId: "G-2MB2WPLY00"
  };

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore();

export const getData = (coll, func) => {
    db.collection(coll).get()
    .then((snapshot) => {
        snapshot.forEach((docs) => {
            switch (coll) {
                case "labels":
                    func(docs.data().labels)
                    console.log(docs.data().labels)
                    break
                case "expenses":
                    func(docs.data().expenses)
                    console.log(docs.data().expenses)
                    break
                default:
                    return
            }
        })
    })
}

export const writeData = (coll, exp, expenses) => {
    console.log(expenses)
    if (exp) {
        let array = expenses
        array.push(exp)
    }
    db.collection(coll).doc('8CJ5sBDg05YAVjow0HUW').set({
        expenses
        
    })
}

// export let labels = getData('labels')
// export const labels = [
// {label:'Land Lord', dispatch:'SET_LAND_LORD', options: ['Elane', 'Katheen', 'George']}, 
// {label:'Crop', dispatch:'SET_CROP', options: ['Corn', 'Soy Beans']}, 
// {label:'Year', dispatch:'SET_YEAR', options: ['2018', '2019', '2020', '2021']}, 
// ]

export const expenses = [
    {label:'Seed', dispatch:'SET_SEED', options: ['PI45732', 'PI21832', 'PI45748', 'PI45735',]},
    {label:'Chemical', dispatch:'SET_CHEMICAL', options: ['Roundup', '24D', 'Chemical C', 'Chemical D',]},
    {label:'Fertilizer', dispatch:'SET_CHEMICAL', options: ['liquid 28-0-0', 'Dry 0-0-60', 'Avail', 'N-Serve',]},
    {label:'LP', dispatch:'SET_CHEMICAL'},
    {label:'Trucking', dispatch:'SET_CHEMICAL'},
]
