import React, {useState} from 'react';
import {Keyboard, Modal, TouchableWithoutFeedback, Alert} from 'react-native';
import {useForm} from 'react-hook-form'
import { Input } from '../../components/Form/Input';
import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypebutton } from '../../components/Form/TransactionTypebutton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import {CategorySelect} from "../CategorySelect";
import {Container, Header, Title, Form, Fields, TransactionsTypes} from './styles';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

interface FormData{
    name:string;
    amount:string;
}

const schema = Yup.object().shape({
    name:Yup.string().required('Nome é obrigatório'),
    amount:Yup.number().typeError('Informe um valor numérico').positive('O valor não pode ser negativo').required('Informe um valor numérico')
});

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
        if(!transactionType)
            return Alert.alert('Selecione o tipo da transação');
        if(category.key==='category')
            return Alert.alert('Selecione a categoria');


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
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema)
    });
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputForm error={errors.name && errors.name.message} control={control} name={'name'} autoCapitalize={'sentences'} autoCorrect={false} placeholder={"Nome"}/>
                        <InputForm  error={errors.amount && errors.amount.message} control={control} name={'amount'} keyboardType={'numeric'} placeholder={"Preço"}/>
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
        </TouchableWithoutFeedback>

    );
}
