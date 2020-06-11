import React from 'react';

const appContext = React.createContext({
    rhymeWords: [],
    describingWords: [],
    questions: [],
    genreInfo: () => {},
    userInfo: () => {},
    value: '',
    username: '',
    lyrics: '',
    selected: 'Rock',
    genres: {
        Rock: {
            
        },
        Jazz: {
            
        },
        EDM: {
            
        },
        Rap: {
           
        },
        Techno: {
          
        },
        Country: {
          
        },
    },
    generateRandomQuestion: () => {},
    saveLyrics: () => {},
    generateRandomWord: () => {},
    changePage: () => {},
    errorChangePage: () => {},
    generateDescribingWord: () => {},
    generateRhymeWord: () => {},
    signUp: () => {},
    login: () => {},
    genre: '',
    updateUserLyrics: () => {} 
})

export default appContext;