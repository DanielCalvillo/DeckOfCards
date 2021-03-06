import React, { Component } from 'react';
import '../Assets/DeckOfCards.css'
import Card from './Card';
import axios from 'axios';

class DeckOfCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deck: null,
            givenDeck: []
        }
        this.deliverNewCard = this.deliverNewCard.bind(this)
    }

    async deliverNewCard() {
        const deck_id = this.state.deck.deck_id
        // const cardUrl = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/`
        // let newCard = await axios.get(cardUrl)
        
        // if(this.state.givenDeck) {
        //     console.log(newCard.data.cards[0])
        //     await this.setState({
        //         deck: newCard.data,
        //         givenDeck: [...this.state.givenDeck, newCard.data.cards[0]],
        //     })
        // } else {
        //     await this.setState({
        //         deck: newCard.data,
        //     })
    
        //     this.setState({
        //         givenDeck: this.state.deck.cards
        //     })
        // }
        try {
            const cardUrl = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/`
            let newCard = await axios.get(cardUrl)
            if(!newCard.data.success) {
                throw new Error("No cards remaining!")
            }
            let card = newCard.data.cards[0];
            // Set the state with a callback function to avoid errors
            this.setState(st => ({
                givenDeck: [
                    ...st.givenDeck,
                    {
                        id: card.code,
                        image: card.image,
                        name: `${card.value} of ${card.suit}`
                    }
                ]
            }));
        } catch (err) {
            alert(err)
        }
    }

    async componentDidMount() {
        const url = 'https://deckofcardsapi.com/api/deck/new/shuffle';
        let response = await axios.get(url);
        this.setState( {
            deck: response.data
        })
    }

    render() {

        // if(this.state.givenDeck) {
        //     var counter = this.state.givenDeck.length
        //     var cardUrl = this.state.givenDeck[counter-1].images.svg
        //     console.log(counter)
        //     var stillADeck = this.state.deck.remaining
        //     console.log(stillADeck)
        // }

        let cards = this.state.givenDeck.map( c => (
            <Card name={c.name} image={c.image} />
        ))

        return (
            <div>

                <button onClick={this.deliverNewCard}>
                    GIVE ME A CARD!
                </button>
                <div className="Deck-cardarea">{cards}</div>
            </div>
        )
    }
}

export default DeckOfCards;