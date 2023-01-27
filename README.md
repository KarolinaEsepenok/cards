# Project:
Cards for learn

# Description:
Learn the information you need with question-and-answer cards.  

The basis of the project is a pack of cards. The card contains a question and an answer. In tutorial mode, you see a card with a question, mentally answer it, click "see answer" and rate how correctly you answered it.  

Then your score is taken into account when you show the cards. You will rarely be shown a question that you know the answer. You will be shown a card with the question you need to learn.  Showing cards in tutorial mode is endless.  

You can create your own card packs or learn from public packs. You can edit, delete, and make your packs private.  

# How to use our project:
- you must register => [Sign in](https://karolinaesepenok.github.io/cards/#/signIn)
- you can learn cards from other people's packs
- create your own packs with cards, filling them with the information you want. For example, you can create a deck with words in different languages and their translation
- learn the cards until you remember them
- manage your packs and cards (make packs private, edit titles/questions/answers, delete packs/cards)
- to start learning the cards, open the menu and click learn
  
# Authors:
[Karolina Esepenok](https://github.com/KarolinaEsepenok)  
[Morozova Anastasiya](https://github.com/MorozovaAN)  
[Svetlana Mysliatska]( https://github.com/lily1215z)  
[Oleg Kozikov](https://github.com/Oldeg)  

# Stack:
- React
- TypeScript
- Redux toolkit
- SCSS
- CSS Modules
- MUI
- axios
- react-router-dom
- formik

# What was implemented on the project:
- registration
- logout
- display packs and cards in the form of tables
- filters by packs:
  * search by deck name
  * filter by number of cards in a pack (minimum and maximum)
  * sorting into my and other people's packs
  * page switching
  * choosing the number of packs to display
  * reset all filters
- CRUD operations with packs and cards
- modal windows for CRUD operations
- clever randomness when displaying cards in tutorial mode: the card will be shown more often if it has a low rating.