import React from 'react';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { TransactionTypebutton } from '../../components/Form/TransactionTypebutton';
import {Container, Header, Title, Form, Fields, TransactionsTypes} from './styles';

export function Register(){
    return(
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                    <Fields>
                        <Input placeholder={"Nome"}/>
                        <Input placeholder={"Preço"}/>
                        <TransactionsTypes>
                            <TransactionTypebutton type={'up'} title={'Income'} />
                            <TransactionTypebutton type={'down'} title={'Outcome'} />
                        </TransactionsTypes>
                    </Fields>
                    <Button title={'Enviar'}></Button>
                </Form>

            </Container>

    );
}
