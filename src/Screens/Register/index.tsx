import React, {useState} from 'react';
import {Modal} from 'react-native';
import {useForm} from 'react-hook-form'
import { Input } from '../../components/Form/Input';
import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypebutton } from '../../components/Form/TransactionTypebutton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import {CategorySelect} from "../CategorySelect";
import {Container, Header, Title, Form, Fields, TransactionsTypes} from './styles';

interface FormData{
    name:string;
    amount:string;
}

export function Register(){
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen,setCategoryModalOpen]= useState(false);

    const [category,setCategory] =useState({
        key:'category',
        name:'Categoria',
    });


    function handleTransactionsTypeSelect(type:'up' | 'down'){
        setTransactionType(type);
    }

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
    }
    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
    }
    function handleRegister(form: FormData){
        const data={
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }
        console.log(data)
    }
    const {
        control,
        handleSubmit
    } = useForm();
    return(
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputForm control={control} name={'name'} placeholder={"Nome"}/>
                        <InputForm control={control} name={'amount'} placeholder={"Preço"}/>
                        <TransactionsTypes>
                            <TransactionTypebutton isActive={transactionType === 'up'} onPress={()=>handleTransactionsTypeSelect('up')} type={'up'} title={'Income'} />
                            <TransactionTypebutton isActive={transactionType === 'down'} onPress={()=>handleTransactionsTypeSelect('down')} type={'down'} title={'Outcome'} />
                        </TransactionsTypes>

                        <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal}></CategorySelectButton>
                    </Fields>
                    <Button onPress={handleSubmit(handleRegister)} title={'Enviar'}></Button>
                </Form>
                <Modal visible={categoryModalOpen}>
                    <CategorySelect category={category} setCategory={setCategory} closeSelectCategory={handleCloseSelectCategoryModal}/>
                </Modal>
            </Container>

    );
}
