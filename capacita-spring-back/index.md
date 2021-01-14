# Capacita RFB

## Sobre a aplicação
Aplicação feita usando [EsqueletoSpring](https://desenvolvimento-interno-catalogo.rfoc.srf/fernando.s.fernandes/cmpnt-webcommonsrfb/-/tree/master/projetos/esqueleto-web_java-spring_html-es6) feito usando Java (framework Spring) e Front-End ES6.  
Para o desenvolvimento rodamos o EsqueletoSpring localmente no Eclipse como um programa Java (é gerado um arquivo jar que sobe um servidor web local embutido).  
Para colocar em produção geramos um arquivo WAR e fazemos o deploy em um servidor Tomcat.  
O backend é todo exposto em uma API Rest e é consumido pelo frontend feito em HTML, CSS e Javascript.  
O projeto também utiliza o gerenciador de pacotes [Maven](https://maven.apache.org/) para Java.

## Primeiro acesso
Automaticamente o primeiro usuário a acessar o sistema recebe os perfis de administrador e cadastrador.
Cada usuário subsequente que entra no sistema tem um usuário equivalente criado no banco de dados com seu CPF (inicialmente não recebe nenhuma permissão especial).
TODO: Administrador poder adicionar usuários, configurações de acesso para usuários não cadastrados.

## Base de dados
### H2 com arquivo em disco
O projeto está configurado para usar uma base de dados H2 persistida em disco no arquivo.
Veja o arquivo ./src/main/resources/application.properties para mais configurações e referências.


## Perfis de Acesso
ROLE_ADMINISTRADOR
	Cria módulos e permissões do sistema
	
ROLE_CADASTRADOR
	Concede perfil a outros usuários
	

	