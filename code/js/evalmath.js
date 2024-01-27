/**
 * Autor: Rafael Alberto Moreno Parra Correo: ramsoftware@gmail.com P�gina Web:
 * http://darwin.50webs.com Licencia: LGPL Fecha: Enero de 2012
 */
function Pieza() {
	/*
	 * Nivel en la expresi�n, a mayor valor, es mayor profundidad en la
	 * expresi�n
	 */
	this.nivel;
	/* 1. Almacena un n�mero, 2. Almacena un operador */
	this.tipo;
	/* El n�mero en la expresi�n algebraica */
	this.numero;
	/* El operador (+, -, *, /, ^) en la expresi�n algebraica */
	this.operador;
	/*
	 * Determina si esta pieza ya ha sido evaluada en el momento de hacer los
	 * c�lculos que determinan el valor de la expresi�n
	 */
	this.evaluado;
	/* El resultado parcial de la evaluaci�n de la expresi�n */
	this.acumula;
	/**
	 * Constructor en caso que la pieza contenga un n�mero real
	 * 
	 * @param numero
	 *            N�mero de tipo double
	 */
	this.ConstructorNumero = function(numero) {
		this.tipo = 1; // Es un n�mero
		this.numero = numero;
		this.evaluado = false;
		this.acumula = numero;
	}
	/**
	 * Constructor en caso que el nodo contenga un operador (+, -, *, /, ^)
	 * 
	 * @param operador
	 *            Que puede ser +, -, *, /, ^
	 */
	this.ConstructorOperador = function(operador, nivel) {
		this.tipo = 2; // Es un operador
		this.operador = operador;
		this.nivel = nivel;
		this.evaluado = false;
		this.acumula = 0;
	}

	/**
	 * Constructor en caso que el nodo contenga una variable
	 * 
	 * @param variable
	 *            Puede ir de 0 a 25 que representa de a..z
	 * @param nivel
	 *            Nivel en que se encuentra en la expresi�n este operador
	 */
	this.ConstructorVariable = function(variable, nivel) {
		this.tipo = 3; // Es una variable
		this.variable = variable;
		this.nivel = nivel;
		this.evaluado = false;
		this.acumula = 0;
	}
	/**
	 * Constructor en caso que la pieza contenga una funci�n
	 * 
	 * @param funcion
	 *            Identificaci�n de la funci�n
	 * @param nivel
	 *            Nivel en que se encuentra en la expresi�n este operador
	 */
	this.ConstructorFuncion = function(funcion, nivel) {
		this.tipo = 4; // Es una funci�n
		this.funcion = funcion;
		this.nivel = nivel;
		this.evaluado = false;
		this.acumula = 0;
	}
	/**
	 * Retorna el acumulado que tiene esta pieza
	 * 
	 * @return Acumulado de la pieza
	 */
	this.getAcumula = function() {
		return this.acumula;
	}
	/**
	 * Retorna si la pieza ya fue evaluada
	 * 
	 * @return True si la pieza ya fue evaluada
	 */
	this.isEvaluado = function() {
		return this.evaluado;
	}
	/**
	 * Retorna el n�mero de tipo double que tiene la pieza
	 * 
	 * @return El valor del n�mero tipo double
	 */
	this.getNumero = function() {
		return this.numero;
	}
	/**
	 * Retorna el operador (+, -, *, /, ^) que tiene la pieza
	 * 
	 * @return El operador en char
	 */
	this.getOperador = function() {
		return this.operador;
	}

	/**
	 * Retorna la variable que tiene la pieza
	 * 
	 * @return La variable
	 */
	this.getVariable = function() {
		return this.variable;
	}
	/**
	 * Retorna que tipo de pieza es: n�mero u operador
	 * 
	 * @return Tipo de pieza
	 */
	this.getTipo = function() {
		return this.tipo;
	}
	/**
	 * Retorna en que nivel se encuentra la pieza con respecto a la expresi�n
	 * 
	 * @return Nivel
	 */
	this.getNivel = function() {
		return this.nivel;
	}
	/**
	 * Retorna el c�digo de la funci�n (abs, sen, cos, tan) que tiene la pieza
	 * 
	 * @return C�digo de la funci�n
	 */
	this.getFuncion = function() {
		return this.funcion;
	}

	/**
	 * Da valor al acumulado por pieza
	 * 
	 * @param acumulado
	 *            Acumulado que nace de cada operaci�n simple es dado a la pieza
	 *            aqu�.
	 */
	this.setAcumula = function(acumulado) {
		this.acumula = acumulado;
	}
	/**
	 * Marca la pieza como ya evaluada
	 * 
	 * @param evaluado
	 *            true si la pieza ya ha sido evaluada, false si no
	 */
	this.setEvaluado = function(evaluado) {
		this.evaluado = evaluado;
	}
}
/**
 * ***********************************************************************************************************
 * 
 * 
 * ***********************************************************************************************************
 */
function EvaluadorExpresionAlgebraica()
/**
 * Evaluador de expresiones algebraicas. Recibe la expresi�n algebraica por
 * ejemplo: "sin(x)+cos(y)*3.14" como una cadena (String) junto con el valor de
 * las variables (x=8.92, y=-7.43) el algoritmo interpreta esa expresi�n
 * respetando las reglas algebraicas y retorna el resultado de tipo double.
 * 
 * @author Rafael Alberto Moreno Parra Correo: ramsoftware@gmail.com P�gina Web:
 *         http://darwin.50webs.com Licencia: LGPL Fecha: Mayo de 2011
 */
{
	/**
	 * Constantes para determinar que tipo es cada pieza en que se divide la
	 * expresi�n algebraica
	 */
	this.ESNUMERO = 1;
	this.ESOPERADOR = 2;
	this.ESVARIABLE = 3;
	this.ESFUNCION = 4;
	/**
	 * Esta constante sirve para que se reste al car�cter y se obtenga el n�mero
	 * usado en el arreglo unidimensional que alberga los valores de las
	 * variables Ejemplo: 'b' - ASCIILETRA = 1
	 */
	this.ASCIILETRA = 97;
	/**
	 * Las funciones que soporta este evaluador
	 */
	this.TAMANOFUNCION = 39;
	this.listaFunciones = "sinsencostanabsasnacsatnlogceiexpsqrrcb";
	/**
	 * Lista simplemente enlazada que tiene los componentes (n�mero, operador o
	 * funci�n) de la expresi�n algebraica ya dividida.
	 */
	this.Piezas = [];
	/**
	 * Arreglo unidimensional con las 26 variables diferentes
	 */
	this.valorVariable = [];
	/**
	 * Almacena hasta que nivel se llega en par�ntesis internos
	 */
	this.MaximoNivel;
	/**
	 * Variable que se pone a true cuando hay un error matem�tico
	 */
	this.ERRORMATEMATICO;
	/**
	 * Este m�todo se encarga de analizar la expresi�n y convertirla en una
	 * estructura que permita evaluar la expresi�n.
	 * 
	 * Convierte una expresi�n algebraica en una sucesi�n de nodos. |2| |+| |a|
	 * |/| |5| |*| |cos| |y|
	 * 
	 * @param expr
	 *            La expresi�n algebraica sin espacios y en min�sculas
	 */
	this.Analizar = function(expr) {
		/* Inicializa la lista de piezas */
		this.Piezas.length = 0;
		NumeroPieza = 0;
		/* Inicializa el nivel */
		nivel = 0;
		this.MaximoNivel = 0;
		/* Tama�o de la expresi�n simple */
		longitud = expr.length;
		/* Conversi�n de string a double */
		entero = 0;
		fraccion = 0;
		divide = 1;
		puntoentero = false;
		/* Si llevaba acumulando un valor num�rico esta variable se vuelve true */
		acumulabaNumero = false;
		for (cont = 0; cont < longitud; cont++) {
			/* Trae la letra */
			letra = expr.charAt(cont);
			/* Si hay un par�ntesis que abre, el nivel aumenta */
			if (letra == '(') {
				nivel++;
				if (nivel > this.MaximoNivel)
					this.MaximoNivel = nivel;
			}
			/* Si es par�ntesis que cierra, el nivel disminuye */
			else if (letra == ')')
				nivel--;
			/* Si es una variable o una funci�n */
			else if (letra >= 'a' && letra <= 'z') {
				/* Detecta si es una funci�n porque tiene dos letras seguidas */
				if (cont < longitud - 1) {
					/*
					 * Chequea si el siguiente car�cter es una letra, dado el
					 * caso es una funci�n
					 */
					letra2 = expr.charAt(cont + 1);
					if (letra2 >= 'a' && letra2 <= 'z') {
						letra3 = expr.charAt(cont + 2);
						/* Identifica las funciones */
						funcionDetectada = 1;
						for (funcion = 0; funcion <= this.TAMANOFUNCION; funcion += 3) {
							if (letra == this.listaFunciones.charAt(funcion)
									&& letra2 == this.listaFunciones
											.charAt(funcion + 1)
									&& letra3 == this.listaFunciones
											.charAt(funcion + 2))
								break;
							funcionDetectada++;
						}
						/* Adiciona a la lista */
						objeto = new Pieza();
						objeto.ConstructorFuncion(funcionDetectada, nivel);
						this.Piezas[NumeroPieza++] = objeto;
						nivel++;
						if (nivel > this.MaximoNivel)
							this.MaximoNivel = nivel;
						/* Mueve tres caracteres sin( [s][i][n][(] */
						cont += 3;
					}
					/* Es una variable, no una funci�n */
					else {
						objeto = new Pieza();
						objeto.ConstructorVariable(letra - this.ASCIILETRA,
								nivel);
						this.Piezas[NumeroPieza++] = objeto;
					}
				}
				/* Es una variable, no una funci�n */
				else {
					objeto = new Pieza();
					objeto.ConstructorVariable(letra - this.ASCIILETRA, nivel);
					this.Piezas[NumeroPieza++] = objeto;
				}
			}
			/* Si es un n�mero */
			else if ((letra >= '0' && letra <= '9') || letra == '.') {
				/* Ir armando el n�mero de tipo double */
				if (letra == '.')
					puntoentero = true;
				else if (!puntoentero) /* puntoentero == false */
					entero = entero * 10 + parseFloat(letra);
				else {
					fraccion = fraccion * 10 + parseFloat(letra);
					divide *= 10;
				}
				acumulabaNumero = true;
			} else {
				/*
				 * Si es un operador entonces crea el nodo del operador y el
				 * nodo del n�mero si ven�a acumulando un n�mero
				 */
				if (acumulabaNumero) {
					/* El nodo del n�mero */
					objeto = new Pieza();
					objeto.ConstructorNumero(entero + fraccion / divide, nivel);
					this.Piezas[NumeroPieza++] = objeto;
				}
				/* El nodo operador */
				objeto = new Pieza();
				objeto.ConstructorOperador(letra, nivel);
				/* Agrega a la lista */
				this.Piezas[NumeroPieza++] = objeto;
				/*
				 * Inicializa de nuevo las variables de conversi�n de string a
				 * n�mero
				 */
				entero = fraccion = 0;
				divide = 1;
				puntoentero = acumulabaNumero = false;
			}
		}
		/*
		 * Cierra la expresi�n simple preguntando si el �ltimo operando es un
		 * n�mero
		 */
		if (acumulabaNumero) {
			objeto = new Pieza();
			objeto.ConstructorNumero(entero + fraccion / divide, nivel);
			this.Piezas[NumeroPieza++] = objeto;
		}
	}
	/**
	 * Ya construida la lista del tipo: [nodo n�mero] [nodo operador] [nodo
	 * n�mero] [nodo operador] ..... es ir del operador con mas precedencia al
	 * de menos precedencia.
	 * 
	 * Este m�todo se llama despu�s de haber sido analizada la expresi�n.
	 * 
	 * En el caso que s�lo cambia el valor de una variable, no es necesario
	 * analizar de nuevo la expresi�n, luego es muy r�pido evaluar m�ltiples
	 * veces la misma expresi�n.
	 * 
	 * @return El valor de la expresi�n evaluada (double)
	 */
	this.Evaluar = function() {
		pos = 0, antes = 0, sigue = 0;
		ERRORMATEMATICO = false;
		/* Total de nodos en la lista creada */
		totalPiezas = this.Piezas.length;
		for (pos = 0; pos < totalPiezas; pos++) {
			/* Activa todas las piezas para que sean evaluadas */
			this.Piezas[pos].setEvaluado(false);
			/*
			 * Recorre toda la lista poniendo los valores de las variables en el
			 * acumulado de cada pieza. �C�mo? Extrae el valor del arreglo
			 * unidimensional que alberga los valores de las variables.
			 */
			if (this.Piezas[pos].getTipo() == this.ESVARIABLE)
				this.Piezas[pos].setAcumula(this.valorVariable[this.Piezas[pos]
						.getVariable()]);
			else if (this.Piezas[pos].getTipo() == this.ESNUMERO)
				this.Piezas[pos].setAcumula(this.Piezas[pos].getNumero());
		}
		/* Va del nivel mas profundo al mas superficial */
		for (evaluaNivel = this.MaximoNivel; evaluaNivel >= 0; evaluaNivel--) {
			/* Recorre toda la lista */
			for (pos = 0; pos < totalPiezas; pos++) {
				/*
				 * Si encuentra una pieza de tipo funci�n la eval�a con el valor
				 * de la siguiente pieza
				 */
				if (this.Piezas[pos].getNivel() == evaluaNivel
						&& this.Piezas[pos].getTipo() == this.ESFUNCION) {
					switch (this.Piezas[pos].getFuncion()) {
					case 1:
					case 2:
						this.Piezas[pos].setAcumula(Math
								.sin(this.Piezas[pos + 1].getAcumula()));
						break;
					case 3:
						this.Piezas[pos].setAcumula(Math
								.cos(this.Piezas[pos + 1].getAcumula()));
						break;
					case 4:
						this.Piezas[pos].setAcumula(Math
								.tan(this.Piezas[pos + 1].getAcumula()));
						break;
					case 5:
						if (this.Piezas[pos + 1].getAcumula() > 0)
							this.Piezas[pos].setAcumula(this.Piezas[pos + 1]
									.getAcumula());
						else
							this.Piezas[pos].setAcumula(-this.Piezas[pos + 1]
									.getAcumula());
						break;
					case 6:
						if (this.Piezas[pos + 1].getAcumula() >= -1
								&& this.Piezas[pos + 1].getAcumula() <= 1)
							this.Piezas[pos].setAcumula(Math
									.asin(this.Piezas[pos + 1].getAcumula()));
						else {
							ERRORMATEMATICO = true;
							return 0;
						}
						break;
					case 7:
						if (this.Piezas[pos + 1].getAcumula() >= -1
								&& this.Piezas[pos + 1].getAcumula() <= 1)
							this.Piezas[pos].setAcumula(Math
									.acos(this.Piezas[pos + 1].getAcumula()));
						else {
							ERRORMATEMATICO = true;
							return 0;
						}
						break;
					case 8:
						this.Piezas[pos].setAcumula(Math
								.atan(this.Piezas[pos + 1].getAcumula()));
						break;
					case 9:
						this.Piezas[pos].setAcumula(Math
								.log(this.Piezas[pos + 1].getAcumula()));
						break;
					case 10:
						this.Piezas[pos].setAcumula(Math
								.ceil(this.Piezas[pos + 1].getAcumula()));
						break;
					case 11:
						this.Piezas[pos].setAcumula(Math
								.exp(this.Piezas[pos + 1].getAcumula()));
						break;
					case 12:
						if (this.Piezas[pos + 1].getAcumula() >= 0)
							this.Piezas[pos].setAcumula(Math
									.sqrt(this.Piezas[pos + 1].getAcumula()));
						else {
							ERRORMATEMATICO = true;
							return 0;
						}
						break;
					case 13:
						this.Piezas[pos].setAcumula(Math.pow(
								this.Piezas[pos + 1].getAcumula(), 1 / 3));
						break;
					}
					/* Marca el nodo siguiente como ya evaluado */
					this.Piezas[pos + 1].setEvaluado(true);
				}
			}
			/* Recorre toda la lista */
			for (pos = 0; pos < totalPiezas; pos++) {
				/* Si encuentra un nodo del tipo operador y es exponente */
				if (this.Piezas[pos].getNivel() == evaluaNivel
						&& this.Piezas[pos].getTipo() == this.ESOPERADOR
						&& this.Piezas[pos].getOperador() == '^') {
					/*
					 * Busca un nodo anterior que sea n�mero o variable y no
					 * haya sido evaluado
					 */
					for (antes = pos - 1; this.Piezas[antes].isEvaluado(); antes--)
						;
					/*
					 * Busca un nodo siguiente que sea n�mero o variable y no
					 * haya sido evaluado
					 */
					for (sigue = pos + 1; this.Piezas[sigue].isEvaluado(); sigue++)
						;
					/* Marca esos nodos actual y siguiente como ya evaluados */
					this.Piezas[pos].setEvaluado(true);
					this.Piezas[sigue].setEvaluado(true);
					/* Hace la operaci�n de N�mero elevado a N�mero */
					this.Piezas[antes].setAcumula(Math.pow(this.Piezas[antes]
							.getAcumula(), this.Piezas[sigue].getAcumula()));
				}
			}
			/* Recorre toda la lista */
			for (pos = 0; pos < totalPiezas; pos++) {
				/*
				 * Si encuentra un nodo del tipo operador y es multiplicaci�n o
				 * divisi�n
				 */
				if (this.Piezas[pos].getNivel() == evaluaNivel
						&& this.Piezas[pos].getTipo() == this.ESOPERADOR
						&& (this.Piezas[pos].getOperador() == '*' || this.Piezas[pos]
								.getOperador() == '/')) {
					/*
					 * Busca un nodo anterior que sea n�mero o variable y no
					 * haya sido evaluado
					 */
					for (antes = pos - 1; this.Piezas[antes].isEvaluado(); antes--)
						;
					/*
					 * Busca un nodo siguiente que sea n�mero o variable y no
					 * haya sido evaluado
					 */
					for (sigue = pos + 1; this.Piezas[sigue].isEvaluado(); sigue++)
						;
					/* Marca esos nodos actual y siguiente como ya evaluados */
					this.Piezas[pos].setEvaluado(true);
					this.Piezas[sigue].setEvaluado(true);
					/* Hace la operaci�n de N�mero * N�mero, o N�mero / N�mero */
					if (this.Piezas[pos].getOperador() == '*')
						this.Piezas[antes].setAcumula(this.Piezas[antes]
								.getAcumula()
								* this.Piezas[sigue].getAcumula());
					else {
						if (this.Piezas[sigue].getAcumula() != 0)
							this.Piezas[antes].setAcumula(this.Piezas[antes]
									.getAcumula()
									/ this.Piezas[sigue].getAcumula());
						else {
							ERRORMATEMATICO = true;
							return 0;
						}
					}
				}
			}
			/* Recorre toda la lista */
			for (pos = 0; pos < totalPiezas; pos++) {
				/* Si encuentra un nodo del tipo operador y es suma o resta */
				if (this.Piezas[pos].getNivel() == evaluaNivel
						&& this.Piezas[pos].getTipo() == this.ESOPERADOR
						&& (this.Piezas[pos].getOperador() == '+' || this.Piezas[pos]
								.getOperador() == '-')) {
					/*
					 * Busca un nodo anterior que sea n�mero o variable y no
					 * haya sido evaluado
					 */
					for (antes = pos - 1; this.Piezas[antes].isEvaluado(); antes--)
						;
					/*
					 * Busca un nodo siguiente que sea n�mero o variable y no
					 * haya sido evaluado
					 */
					for (sigue = pos + 1; this.Piezas[sigue].isEvaluado(); sigue++)
						;
					/* Marca esos nodos actual y siguiente como ya evaluados */
					this.Piezas[pos].setEvaluado(true);
					this.Piezas[sigue].setEvaluado(true);
					/* Hace la operaci�n de N�mero + N�mero, o N�mero - N�mero */
					if (this.Piezas[pos].getOperador() == '+')
						this.Piezas[antes].setAcumula(this.Piezas[antes]
								.getAcumula()
								+ this.Piezas[sigue].getAcumula());
					else
						this.Piezas[antes].setAcumula(this.Piezas[antes]
								.getAcumula()
								- this.Piezas[sigue].getAcumula());
				}
			}
		}
		/* Resultado de la expresi�n */
		return this.Piezas[0].getAcumula();
	}
	/**
	 * Guarda en un arreglo unidimensional el valor de las variables
	 * 
	 * @param variable
	 *            �Qu� variable de la expresi�n recibir� el valor? a..z
	 * @param valor
	 *            Valor de tipo double que tendr� esa variable.
	 */
	this.DarValorVariable = function(variable, valor) {
		this.valorVariable[variable - this.ASCIILETRA] = valor;
	}
	/**
	 * Retorna true si hubo un error matem�tico
	 * 
	 * @return TRUE si hubo un error matem�tico
	 */
	this.getErrorMatematico = function() {
		return ERRORMATEMATICO;
	}
}
