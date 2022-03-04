import React, {useCallback, useEffect, useState} from "react";
import {Container, Header, UserInfo,LoadContainer LogoutButton,Icon, Photo, User, UserGreeting,UserName, UserWrapper, HighlightCards, Transactions, Title, TransactionList} from './DashboardStyle';
import {HighlightCard} from "../../components/HighlightCard";
import {TransactionCard, TransactionCardProps} from "../../components/TransactionCard";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';

export interface DataListProps extends TransactionCardProps{
    id:string;
}

interface HighLightProps{
    amount:string;
}

interface HighLightData{
    entries:HighLightProps;
    expensives:HighLightProps;
    total:HighLightProps

}

export function Dashboard(){
    const [isLoading, setIsLoading]= useState(true);
 const [transactions, setTransactions] = useState<DataListProps[]>([]);
const [highLightData, setHighLightData]= useState<HighLightData>({} as HighLightData);
 async function loadTransactions(){
     const dataKey='@gofinances:transactions';
     const response = await AsyncStorage.getItem(dataKey);

     const transactions = response ? JSON.parse(response) : [];

     let entriesTotal=0;
     let expensiveTotal = 0;

     const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {

         if(item.type==='positive'){
             entriesTotal+=Number(item.amount);
         }else{
             expensiveTotal+=Number(item.amount);
         }

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
     setTransactions(transactionsFormatted);
     const total= entriesTotal-expensiveTotal;
     setHighLightData({
         entries:{
             amount:entriesTotal.toLocaleString('pt-BR',{
                 style:'currency',
                 currency:'BRL',
             })
         },
         expensives:{
             amount:expensiveTotal.toLocaleString('pt-BR',{
                 style:'currency',
                 currency:'BRL',
             })
         },
         total:{
             amount:total.toLocaleString('pt-BR',{
                 style:'currency',
                 currency:'BRL',
             })
         }
     });
 }

 useEffect(()=>{
    loadTransactions();
 },[]);

 useFocusEffect(useCallback(()=>{
     loadTransactions();
 },[]));

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
                <HighlightCard title={'Entradas'} amount={highLightData.entries.amount} lastTransaction={'Última transação feita no dia 13 de abril'} type={'up'}></HighlightCard>
                <HighlightCard title={'Saídas'} amount={highLightData.expensives.amount} lastTransaction={'Última transação feita no dia 13 de abril'} type={"down"}></HighlightCard>
                <HighlightCard title={'Total'} amount={highLightData.total.amount} lastTransaction={'Última transação feita no dia 13 de abril'} type={"total"}></HighlightCard>
            </HighlightCards>
            <Transactions>
               <Title>Listagem</Title>
                <TransactionList
                    data={transactions}
                    keyExtractor={item => item.id}
                    renderItem={({item})=> <TransactionCard data={item}/> }

                />
            </Transactions>
        </Container>
    )
}
