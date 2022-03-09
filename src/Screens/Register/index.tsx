import React, {useState, useEffect} from 'react';
import {Keyboard, Modal, TouchableWithoutFeedback, Alert} from 'react-native';
import {useForm} from 'react-hook-form'
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypebutton } from '../../components/Form/TransactionTypebutton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import {CategorySelect} from "../CategorySelect";
import {Container, Header, Title, Form, Fields, TransactionsTypes} from './styles';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from "@react-navigation/native";
import {useAuth} from "../../hooks/auth";


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

    const {user} = useAuth();
    const dataKey=`@gofinances:transactions_user:${user.id}`;

    const [category,setCategory] =useState({
        key:'category',
        name:'Categoria',
    });

    const navigation = useNavigation();

    function handleTransactionsTypeSelect(type:'positive' | 'negative'){
        setTransactionType(type);
    }

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
    }
    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
    }
    async function handleRegister(form: FormData){
        if(!transactionType)
            return Alert.alert('Selecione o tipo da transação');
        if(category.key==='category')
            return Alert.alert('Selecione a categoria');


        const newTransaction={
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }
        try{

            const data=await AsyncStorage.getItem(dataKey);
            const currentData=data? JSON.parse(data) : [];

            const dataFormatted=[
                ...currentData,
                newTransaction
            ];

            await AsyncStorage.setItem(dataKey,JSON.stringify(dataFormatted));

            reset();
            setTransactionType('');
            setCategory({
                key:'category',
                name:'Categoria'
            });

            navigation.navigate('Listagem');

        }catch(error){
            console.log(error);
            Alert.alert("Não foi possível salvar");
        }
    }
    const {
        control,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(()=>{
        async function loadData(){
         const data =   await AsyncStorage.getItem(dataKey);
         console.log(JSON.parse(data!));
        }
        loadData();

    }, []);
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
                            <TransactionTypebutton isActive={transactionType === 'positive'} onPress={()=>handleTransactionsTypeSelect('positive')} type={'up'} title={'Income'} />
                            <TransactionTypebutton isActive={transactionType === 'negative'} onPress={()=>handleTransactionsTypeSelect('negative')} type={'down'} title={'Outcome'} />
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
