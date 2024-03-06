class Produto {
    constructor(){
        this.id = 1
        this.arrayProdutos = []
        this.editId = null
    }
    salvar(){
        let produto = this.lerDados()

        if(this.validaCampos(produto)){ // == true já é considerado
            if(this.editId == null){
                this.adicionar(produto)
            }else{
                this.atualizar(this.editId, produto);
            }
            
        }

        // console.log(this.arrayProdutos)

        this.listaTabela();

        this.cancelar();
    }

    listaTabela(){
        let tbody = document.getElementById('tbody')

        tbody.innerText = ''

        for(let i = 0; i< this.arrayProdutos.length; i++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = this.arrayProdutos[i].valor;
            
            td_id.classList.add('center')

            let imgEdit = document.createElement('img')
            imgEdit.src = 'img/editar.png';
            
            imgEdit.setAttribute("onclick","produto.preparaEdicao("+ JSON.stringify(this.arrayProdutos[i]) +")")

            let imgDelete = document.createElement('img')
            imgDelete.src = 'img/delete.png'

            imgDelete.setAttribute("onclick","produto.deletar("+ this.arrayProdutos[i].id +")")

            td_acoes.appendChild(imgEdit)
            td_acoes.appendChild(imgDelete)

            console.log(this.arrayProdutos)

        }
    }

    adicionar(produto){
        produto.valor = parseFloat(produto.valor)
        this.arrayProdutos.push(produto)
        this.id++
    }

    atualizar(id, produto){
        for(let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto
                this.arrayProdutos[i].valor = produto.valor
            }
        }
    }

    preparaEdicao(dados){
        this.editId = dados.id

        document.getElementById('produto').value = dados.nomeProduto
        document.getElementById('valor').value = dados.valor

        document.getElementById('btn1').innerText = 'Atualizar'

    }

    lerDados(){
        let produto = {}
        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.valor = document.getElementById('valor').value;

        return produto;
    }

    validaCampos(produto){
        let msg = '';


        if(produto.nomeProduto == ''){
            msg += '- Informe o nome do produto!\n';
        }

        if(produto.valor == ''){
            msg += '- Informe o valor do produto!\n';
        }

        if(msg != ''){
            alert(msg)
            return false;
        }
        return true;
    }

    cancelar(){
        document.getElementById('produto').value = ''
        document.getElementById('valor').value = ''

        document.getElementById('btn1').innerText = 'Salvar'
        this.editId = null


    }
    deletar(id){
        let tbody = document.getElementById('tbody')
        
        if(confirm('Deseja realmente deletar o produto do ID: ' + id)){
            for(let i = 0; i< this.arrayProdutos.length; i++){
                if(this.arrayProdutos[i].id == id){
                    this.arrayProdutos.splice(i, 1)
                    tbody.deleteRow(i)
                }
            }
            console.log(this.arrayProdutos)
        } 
    }
}

var produto = new Produto()