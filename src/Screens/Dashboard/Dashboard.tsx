import React, {useEffect, useState} from "react";
import {Container, Header, UserInfo, LogoutButton,Icon, Photo, User, UserGreeting,UserName, UserWrapper, HighlightCards, Transactions, Title, TransactionList} from './DashboardStyle';
import {HighlightCard} from "../../components/HighlightCard";
import {TransactionCard, TransactionCardProps} from "../../components/TransactionCard";
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface DataListProps extends TransactionCardProps{
    id:string;
}

export function Dashboard(){
 const [data, setData] = useState<DataListProps[]>([]);

 async function loadTransactions(){
     const dataKey='@gofinances:transactions';
     const response = await AsyncStorage.getItem(dataKey);

     const transactions = response ? JSON.parse(response) : [];
     const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
         const amount = Number(item.amount).toLocaleString('pt-BR',{
             style:'currency',
             currency:'BRL'
         });
         const date = Intl.DateTimeFormat('pt-BR',{
             day:'2-digit',
             month:'2-digit',
             year:'2-digit'
         }).format(new Date(item.date));
         return {
             id:item.id,
             name:item.name,
             amount,
             type: item.type,
             category: item.category,
             date,
         }
     });
     setData(transactionsFormatted);
 }

 useEffect(()=>{
    loadTransactions();
 },[]);

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
                    <LogoutButton onPress={()=>{}}>
                        <Icon name={'power'}/>
                    </LogoutButton>
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
