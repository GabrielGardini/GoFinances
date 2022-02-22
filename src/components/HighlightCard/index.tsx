import React from 'react';

import {Container, Header, Title, Icon, Footer, Amount, LastTransaction} from './styles';

export function HighlightCard(){
    return(
        <Container>
            <Header>
                <Title>Entrada</Title>
                <Icon name={'arrow-up-circle'}></Icon>
            </Header>
            <Footer>
                <Amount>R$17.098,99</Amount>
                <LastTransaction>Última entrada no dia 13 de abril</LastTransaction>
            </Footer>
        </Container>
    )
}
