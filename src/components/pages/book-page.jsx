import React, {Component} from 'react';
import RowBlock from '../row-block/row-block';
import ItemList from '../item-list/item-list';
import ItemDetails, {Record} from '../item-details/item-details';
import ErrorBoundry from '../error-boundry/error-boundry';

export default class BookPage extends Component {

    state = {
        selectedBook: null,
    };

    onItemSelected = (bookId) => {
        this.setState({selectedBook: bookId});
    };

    render() {
        const itemList = (
          <ItemList
            onItemSelected={this.onItemSelected}
            getData={this.props.getData.getAllBooks}>
              {/*Рендер-функция переданная как children*/}
              {i => (
                `${i.name} (${i.isbn})`
              )}
          </ItemList>
        );

        const bookDetails = (
          <ErrorBoundry>
              <ItemDetails
                itemId={this.state.selectedBook}
                getData={() => this.props.getData.getBook(this.state.selectedBook)}>
                  <Record field='isbn' label='Isbn'/>
                  <Record field='numberOfPages' label='Pages'/>
              </ItemDetails>
          </ErrorBoundry>
        )

        return (
          <ErrorBoundry>
              {/*props.children*/}
              {RowBlock(itemList, bookDetails)}
          </ErrorBoundry>
        )
    }
};