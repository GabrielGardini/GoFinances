import React from "react";
import {getBottomSpace} from 'react-native-iphone-x-helper';

import {Container, Header, UserInfo,Icon, Photo, User, UserGreeting,UserName, UserWrapper, HighlightCards, Transactions, Title, TransactionList} from './DashboardStyle';
import {View} from "react-native";
import {HighlightCard} from "../../components/HighlightCard";
import {TransactionCard, TransactionCardProps} from "../../components/TransactionCard";

export interface DataListProps extends TransactionCardProps{
    id:string;
}

export function Dashboard(){
    const data: DataListProps[] = [{
        id:'1',
        type:'positive',
        title:'Desenvolvimento de Site',
        amount:'R$12.000,00',
        category:{name:'Vendas', icon:'dollar-sign'},
        date:'13/04/2020'
    },{
        id:'2',
        type:'negative',
        title:'Hamburgueria Pizzy',
        amount:'R$50,00',
        category:{name:'Alimentação', icon:'coffee'},
        date:'10/04/2020'
    },{
        id:'3',
        type:'negative',
        title:'Aluguel do apartamento',
        amount:'R$1.200,00',
        category:{name:'Casa', icon:'shopping-bag'},
        date:'13/04/2020',
    }
];
    return(
        <Container>
            <Header>
                <UserWrapper>
                <UserInfo>
                        <Photo source={{uri:"https://avatars.githubusercontent.com/u/81251211?v=4"}} />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Gabriel</UserName>
                        </User>
                    </UserInfo>
                    <Icon name={'power'}/>
                </UserWrapper>
            </Header>
            <HighlightCards>
                <HighlightCard title={'Entradas'} amount={'R$17.000,00'} lastTransaction={'Última transação feita no dia 13 de abril'} type={'up'}></HighlightCard>
                <HighlightCard title={'Saídas'} amount={'R$17.000,00'} lastTransaction={'Última transação feita no dia 13 de abril'} type={"down"}></HighlightCard>
                <HighlightCard title={'Total'} amount={'R$17.000,00'} lastTransaction={'Última transação feita no dia 13 de abril'} type={"total"}></HighlightCard>
            </HighlightCards>
            <Transactions>
               <Title>Listagem</Title>
                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({item})=> <TransactionCard data={item}/> }

                />
            </Transactions>
        </Container>
    )
}
