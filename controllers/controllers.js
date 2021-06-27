const bcrypt = require('bcrypt');

const AesopFable = require('../models/AesopFable.js');
const RandomContent = require('../models/RandomContent.js');

const CMSUser = require('../models/CMSUser.js');
const CMSLoginLog = require('../models/CMSLoginLog.js');

const cat = require('../var/MPVContent/cat.json');

const getFables = async (req, res) => {
	try {
		AesopFable.countDocuments().exec(async (err, count) => {
			if (err) return res.sendStatus(404);

			const random = Math.floor(Math.random() * count);
			try {
				const fable = await AesopFable.findOne().skip(random - 1);

				res.json({ fable });
				console.log(`(${random}) fable title: ` + fable.title);
			} catch (err) {
				console.log('Error finding the fable:');
				console.log(err);
			}
		});
	} catch (err) {
		console.log(`Error counting the AesopFable model:`);
		console.log(err);
	}

}
const getRandomContent = async (req, res) => {
	try {
		const content = new RandomContent();
		content.title = 'El Gato Negro';
		content.author = 'Edgar Allan Poe';
		content.genre = 'SCIFI';
		content.text = cat.text;
		content.image = './assets/Library/Catalog/cat.png',

			// res.json({
			// 	test: 'something',
			// 	isThisWorking: true,
			// 	niceNumber: 42069,
			// });
			res.json({
				title: 'Onda Vital a Todo Gas',
				author: 'Pepe Problemas',
				genre: 'ROMANCE',
				text: [
					'Esta es la primera línea',
					'Esta es la segunda línea',
					'Y así sucesivamente...',
					"No espero ni pido que alguien crea en el extraño aunque simple relato que me dispongo a escribir. Loco estaría si lo esperara, cuando mis sentidos rechazan su propia evidencia. Pero no estoy loco y sé muy bien que esto no es un sueño. Mañana voy a morir y quisiera aliviar hoy mi alma. Mi propósito inmediato consiste en poner de manifiesto, simple, sucintamente y sin comentarios, una serie de episodios domésticos. Las consecuencias de esos episodios me han aterrorizado, me han torturado y, por fin, me han destruido. Pero no intentaré explicarlos. Si para mí han sido horribles, para otros resultarán menos espantosos que baroques. Más adelante, tal vez, aparecerá alguien cuya inteligencia reduzca mis fantasmas a lugares comunes; una inteligencia más serena, más lógica y mucho menos excitable que la mía, capaz de ver en las circunstancias que temerosamente describiré, una vulgar sucesión de causas y efectos naturales.",
					"Desde la infancia me destaqué por la docilidad y bondad de mi carácter. La ternura que abrigaba mi corazón era tan grande que llegaba a convertirme en objeto de burla para mis compañeros. Me gustaban especialmente los animales, y mis padres me permitían tener una gran variedad. Pasaba a su lado la mayor parte del tiempo, y jamás me sentía más feliz que cuando les daba de comer y los acariciaba. Este rasgo de mi carácter creció conmigo y, cuando llegué a la virilidad, se convirtió en una de mis principales fuentes de placer. Aquellos que alguna vez han experimentado cariño hacia un perro fiel y sagaz no necesitan que me moleste en explicarles la naturaleza o la intensidad de la retribución que recibía. Hay algo en el generoso y abnegado amor de un animal que llega directamente al corazón de aquel que con frecuencia ha probado la falsa amistad y la frágil fidelidad del hombre.",
					"Me casé joven y tuve la alegría de que mi esposa compartiera mis preferencias. Al observar mi gusto por los animales domésticos, no perdía oportunidad de procurarme los más agradables de entre ellos. Teníamos pájaros, peces de colores, un hermoso perro, conejos, un monito y un gato.",
					"Este último era un animal de notable tamaño y hermosura, completamente negro y de una sagacidad asombrosa. Al referirse a su inteligencia, mi mujer, que en el fondo era no poco supersticiosa, aludía con frecuencia a la antigua creencia popular de que todos los gatos negros son brujas metamorfoseadas. No quiero decir que lo creyera seriamente, y sólo menciono la cosa porque acabo de recordarla.",
					"Plutón —tal era el nombre del gato— se había convertido en mi favorito y mi camarada. Sólo yo le daba de comer y él me seguía por todas partes en casa. Me costaba mucho impedir que anduviera tras de mí en la calle.",
					"Nuestra amistad duró así varios años, en el curso de los cuales (enrojezco al confesarlo) mi temperamento y mi carácter se alteraron radicalmente por culpa del demonio. Intemperancia. Día a día me fui volviendo más melancólico, irritable e indiferente hacia los sentimientos ajenos. Llegué, incluso, a hablar descomedidamente a mi mujer y terminé por infligirle violencias personales. Mis favoritos, claro está, sintieron igualmente el cambio de mi carácter. No sólo los descuidaba, sino que llegué a hacerles daño. Hacia Plutón, sin embargo, conservé suficiente consideración como para abstenerme de maltratarlo, cosa que hacía con los conejos, el mono y hasta el perro cuando, por casualidad o movidos por el afecto, se cruzaban en mi camino. Mi enfermedad, empero, se agravaba —pues, ¿qué enfermedad es comparable al alcohol?—, y finalmente el mismo Plutón, que ya estaba viejo y, por tanto, algo enojadizo, empezó a sufrir las consecuencias de mi mal humor.",
					"Una noche en que volvía a casa completamente embriagado, después de una de mis correrías por la ciudad, me pareció que el gato evitaba mi presencia. Lo alcé en brazos, pero, asustado por mi violencia, me mordió ligeramente en la mano. Al punto se apoderó de mí una furia demoníaca y ya no supe lo que hacía. Fue como si la raíz de mi alma se separara de golpe de mi cuerpo; una maldad más que diabólica, alimentada por la ginebra, estremeció cada fibra de mi ser. Sacando del bolsillo del chaleco un cortaplumas, lo abrí mientras sujetaba al pobre animal por el pescuezo y, deliberadamente, le hice saltar un ojo. Enrojezco, me abraso, tiemblo mientras escribo tan condenable atrocidad.",
					"Cuando la razón retornó con la mañana, cuando hube disipado en el sueño los vapores de la orgía nocturna, sentí que el horror se mezclaba con el remordimiento ante el crimen cometido; pero mi sentimiento era débil y ambiguo, no alcanzaba a interesar al alma. Una vez más me hundí en los excesos y muy pronto ahogué en vino los recuerdos de lo sucedido.",
					"El gato, entretanto, mejoraba poco a poco. Cierto que la órbita donde faltaba el ojo presentaba un horrible aspecto, pero el animal no parecía sufrir ya. Se paseaba, como de costumbre, por la casa, aunque, como es de imaginar, huía aterrorizado al verme. Me quedaba aún bastante de mi antigua manera de ser para sentirme agraviado por la evidente antipatía de un animal que alguna vez me ha querido tanto. Pero ese sentimiento no tardó en ceder paso a la irritación. Y entonces, para mi caída final e irrevocable, se presentó el espíritu de la PERVERSIDAD. La filosofía no tiene en cuenta a este espíritu; y, sin embargo, tan seguro estoy de que mi alma existe como de que la perversidad es uno de los impulsos primordiales del corazón humano, una de las facultades primarias indivisibles, uno de esos sentimientos que dirigen el carácter del hombre. ¿Quién no se ha sorprendido a sí mismo cien veces en momentos en que cometía una acción tonta o malvada por la simple razón de que no debía cometerla? ¿No hay en nosotros una tendencia permanente, que enfrenta descaradamente al buen sentido, una tendencia a transgredir lo que constituye la Ley por el solo hecho de serlo? Este espíritu de perversidad se presentó, como he dicho, en mi caída final. Y el insondable anhelo que tenía mi alma de vejarse a sí misma, de violentar su propia naturaleza, de hacer mal por el mal mismo, me incitó a continuar y, finalmente, a consumar el suplicio que había infligido a la inocente bestia. Una mañana, obrando a sangre fría, le pasé un lazo por el pescuezo y lo ahorqué en la rama de un árbol; lo ahorqué mientras las lágrimas manaban de mis ojos y el más amargo remordimiento me apretaba el corazón; lo ahorqué porque recordaba que me había querido y porque estaba seguro de que no me había dado motivo para matarlo; lo ahorqué porque sabía que, al hacerlo, cometía un pecado, un pecado mortal que comprometería mi alma hasta llevarla —si ello fuera posible— más allá del alcance de la infinita misericordia del Dios más misericordioso y más terrible.",
					"La noche de aquel mismo día en que cometí tan cruel acción me despertaron gritos de: «¡Incendio!». Las cortinas de mi cama eran una llama viva y toda la casa estaba ardiendo. Con gran dificultad pudimos escapar de la conflagración mi mujer, un sirviente y yo. Todo quedó destruido. Mis bienes terrenales se perdieron y desde ese momento tuve que resignarme a la desesperanza.",
					"No incurriré en la debilidad de establecer una relación de causa y efecto entre el desastre y mi criminal acción. Pero estoy detallando una cadena de hechos y no quiero dejar ningún eslabón incompleto. Al día siguiente del incendio acudí a visitar las ruinas. Salvo una, las paredes se habían desplomado. La que quedaba en pie era un tabique divisorio de poco espesor, situado en el centro de la casa, y contra el cual se apoyaba antes la cabecera de mi lecho. El enlucido había quedado a salvo de la acción del fuego, cosa que atribuí a su reciente aplicación. Una densa muchedumbre habíase reunido frente a la pared y varias personas parecían examinar parte de la misma con gran atención y detalle. Las palabras «¡extraño!, ¡curioso!» y otras similares excitaron mi curiosidad. Al aproximarme vi que en la blanca superficie, grabada como un bajorrelieve, aparecía la imagen de un gigantesco gato. El contorno tenía una nitidez verdaderamente maravillosa. Había una soga alrededor del pescuezo del animal.",
					"Al descubrir esta aparición —ya que no podía considerarla otra cosa— me sentí dominado por el asombro y el terror. Pero la reflexión vino luego en mi ayuda. Recordé que había ahorcado al gato en un jardín contiguo a la casa. Al producirse la alarma del incendio, la multitud había invadido inmediatamente el jardín: alguien debió de cortar la soga y tirar al gato en mi habitación por la ventana abierta. Sin duda, habían tratado de despertarme en esa forma. Probablemente la caída de las paredes comprimió a la víctima de mi crueldad contra el enlucido recién aplicado, cuya cal, junto con la acción de las llamas y el amoniaco del cadáver, produjo la imagen que acababa de ver.",
					"Si bien en esta forma quedó satisfecha mi razón, ya que no mi conciencia, sobre el extraño episodio, lo ocurrido impresionó profundamente mi imaginación. Durante muchos meses no pude librarme del fantasma del gato, y en todo ese tiempo dominó mi espíritu un sentimiento informe que se parecía, sin serlo, al remordimiento. Llegué al punto de lamentar la pérdida del animal y buscar, en los viles antros que habitualmente frecuentaba, algún otro de la misma especie y apariencia que pudiera ocupar su lugar.",
					"Una noche en que, borracho a medias, me hallaba en una taberna más que infame, reclamó mi atención algo negro posado sobre uno de los enormes toneles de ginebra que constituían el principal moblaje del lugar. Durante algunos minutos había estado mirando dicho tonel y me sorprendió no haber advertido antes la presencia de la mancha negra en lo alto. Me aproximé y la toqué con la mano. Era un gato negro muy grande, tan grande como Plutón y absolutamente igual a éste, salvo un detalle: Plutón no tenía el menor pelo blanco en el cuerpo, mientras este gato mostraba una vasta aunque indefinida mancha blanca que le cubría casi todo el pecho.",
					"Al sentirse acariciado se enderezó prontamente, ronroneando con fuerza, se frotó contra mi mano y pareció encantado de mis atenciones. Acababa, pues, de encontrar el animal que precisamente andaba buscando. De inmediato, propuse su compra al tabernero, pero me contestó que el animal no era suyo y que jamás lo había visto antes ni sabía nada de él.",
					"Continué acariciando al gato y, cuando me disponía a volver a casa, el animal pareció dispuesto a acompañarme. Le permití que lo hiciera, deteniéndome una y otra vez para inclinarme y acariciarlo. Cuando estuvo en casa, se acostumbró a ella de inmediato y se convirtió en el gran favorito de mi mujer.",
					"Por mi parte, pronto sentí nacer en mí una antipatía hacia aquel animal. Era exactamente lo contrario de lo que había anticipado, pero —sin que pueda decir cómo ni por qué— su marcado cariño por mí me disgustaba y me fatigaba. Gradualmente, el sentimiento de disgusto y fatiga creció hasta alcanzar la amargura del odio. Evitaba encontrarme con el animal; un resto de vergüenza y el recuerdo de mi crueldad de antaño me vedaban maltratarlo. Durante algunas semanas me abstuve de pegarle o de hacerle víctima de cualquier violencia; pero gradualmente —muy gradualmente— llegué a mirarlo con inexpresable odio y a huir en silencio de su detestable presencia, como si fuera una emanación de la peste.",
					"Lo que, sin duda, contribuyó a aumentar mi odio fue descubrir, a la mañana siguiente de haberlo traído a casa, que aquel gato, igual que Plutón, era tuerto. Esta circunstancia fue precisamente la que le hizo más grato a mi mujer, quien, como ya dije, poseía en alto grado esos sentimientos humanitarios que alguna vez habían sido mi rasgo distintivo y la fuente de mis placeres más simples y más puros.",
					"El cariño del gato por mí parecía aumentar en el mismo grado que mi aversión. Seguía mis pasos con una pertinacia que me costaría hacer entender al lector. Dondequiera que me sentara venía a ovillarse bajo mi silla o saltaba a mis rodillas, prodigándome sus odiosas caricias. Si echaba a caminar, se metía entre mis pies, amenazando con hacerme caer, o bien clavaba sus largas y afiladas uñas en mis ropas, para poder trepar hasta mi pecho. En esos momentos, aunque ansiaba aniquilarlo de un solo golpe, me sentía paralizado por el recuerdo de mi primer crimen, pero sobre todo —quiero confesarlo ahora mismo— por un espantoso temor al animal.",
					"Aquel temor no era precisamente miedo de un mal físico y, sin embargo, me sería imposible definirlo de otra manera. Me siento casi avergonzado de reconocer —sí, aún en esta celda de criminales me siento casi avergonzado de reconocer que el terror, el espanto que aquel animal me inspiraba, era intensificado por una de las más insensatas quimeras que sería dado concebir —. Más de una vez mi mujer me había llamado la atención sobre la forma de la mancha blanca de la cual ya he hablado, y que constituía la única diferencia entre el extraño animal y el que yo había matado. El lector recordará que esta mancha, aunque grande, me había parecido al principio de forma indefinida; pero gradualmente, de manera tan imperceptible que mi razón luchó durante largo tiempo por rechazarla como fantástica, la mancha fue asumiendo un contorno de rigurosa precisión. Representaba ahora algo que me estremezco al nombrar, y por ello odiaba, temía y hubiera querido librarme del monstruo si hubiese sido capaz de atreverme; representaba, digo, la imagen de una cosa atroz, siniestra…, ¡la imagen del PATÍBULO!; ¡Oh lúgubre y terrible máquina del horror y del crimen, de la agonía y de la muerte!",
					"Me sentí entonces más miserable que todas las miserias humanas. ¡Pensar que una bestia, cuyo semejante había yo destruido desdeñosamente, una bestia era capaz de producir tan insoportable angustia en un hombre creado a imagen y semejanza de Dios! ¡Ay, ni de día ni de noche pude ya gozar de la bendición del reposo! De día, aquella criatura no me dejaba un instante solo; de noche, despertaba hora a hora de los más horrorosos sueños, para sentir el ardiente aliento de la cosa en mi rostro y su terrible peso —pesadilla encarnada de la que no me era posible desprenderme— apoyado eternamente sobre mi corazón.",
					"Bajo el agobio de tormentos semejantes, sucumbió en mí lo poco que me quedaba de bueno. Sólo los malos pensamientos disfrutaban ya de mi intimidad; los más tenebrosos, los más perversos pensamientos. La melancolía habitual de mi humor creció hasta convertirse en aborrecimiento de todo lo que me rodeaba y de la entera humanidad; y mi pobre mujer, que de nada se quejaba, llegó a ser la habitual y paciente víctima de los repentinos y frecuentes arrebatos de ciega cólera a que me abandonaba.",
					"Cierto día, para cumplir una tarea doméstica, me acompañó al sótano de la vieja casa donde nuestra pobreza nos obligaba a vivir. El gato me siguió mientras bajaba la empinada escalera y estuvo a punto de tirarme cabeza abajo, lo cual me exasperó hasta la locura. Alzando un hacha y olvidando en mi rabia los pueriles temores que hasta entonces habían detenido mi mano, descargué un golpe que hubiera matado instantáneamente al animal de haberlo alcanzado. Pero la mano de mi mujer detuvo su trayectoria. Entonces, llevado por su intervención a una rabia más que demoníaca, me zafé de su abrazo y le hundí el hacha en la cabeza. Sin un solo quejido, cayó muerta a mis pies.",
					"Cumplido este espantoso asesinato, me entregué al punto y con toda sangre fría a la tarea de ocultar el cadáver. Sabía que era imposible sacarlo de casa, tanto de día como de noche, sin correr el riesgo de que algún vecino me observara. Diversos proyectos cruzaron mi mente. Por un momento pensé en descuartizar el cuerpo y quemar los pedazos. Luego se me ocurrió cavar una tumba en el piso del sótano. Pensé también si no convenía arrojar el cuerpo al pozo del patio o meterlo en un cajón, como si se tratara de una mercadería común, y llamar a un mozo de cordel para que lo retirara de casa. Pero, al fin, di con lo que me pareció el mejor expediente y decidí emparedar el cadáver en el sótano, tal como se dice que los monjes de la Edad Media emparedaban a sus víctimas.",
					"El sótano se adaptaba bien a este propósito. Sus muros eran de material poco resistente y estaban recién revocados con un mortero ordinario, que la humedad de la atmósfera no había dejado endurecer. Además, en una de las paredes se veía la saliencia de una falsa chimenea, la cual había sido rellenada y tratada de manera semejante al resto del sótano. Sin lugar a dudas, sería muy fácil sacar los ladrillos en esa parte, introducir el cadáver y tapar el agujero como antes, de manera que ninguna mirada pudiese descubrir algo sospechoso.",
					"No me equivocaba en mis cálculos. Fácilmente saqué los ladrillos con ayuda de una palanca y, luego de colocar cuidadosamente el cuerpo contra la pared interna, lo mantuve en esa posición mientras aplicaba de nuevo la mampostería en su forma original. Después de procurarme argamasa, arena y cerda, preparé un enlucido que no se distinguía del anterior, y revoqué cuidadosamente el nuevo enladrillado. Concluida la tarea, me sentí seguro de que todo estaba bien. La pared no mostraba la menor señal de haber sido tocada. Había barrido hasta el menor fragmento de material suelto. Miré en torno, triunfante, y me dije: «Aquí, por lo menos, no he trabajado en vano».",
					"Mi paso siguiente consistió en buscar a la bestia causante de tanta desgracia, pues al final me había decidido a matarla. Si en aquel momento el gato hubiera surgido ante mí, su destino habría quedado sellado, pero, por lo visto, el astuto animal, alarmado por la violencia de mi primer acceso de cólera, se cuidaba de aparecer mientras no cambiara mi humor. Imposible describir o imaginar el profundo, el maravilloso alivio que la ausencia de la detestada criatura trajo a mi pecho. No se presentó aquella noche, y así, por primera vez desde su llegada a la casa, pude dormir profunda y tranquilamente, sí, pude dormir, aun con el peso del crimen sobre mi alma.",
					"Pasaron el segundo y el tercer día y mi atormentador no volvía. Una vez más respiré como un hombre libre. ¡Aterrado, el monstruo había huido de casa para siempre! ¡Ya no volvería a contemplarlo! Gozaba de una suprema felicidad, y la culpa de mi negra acción me preocupaba muy poco. Se practicaron algunas averiguaciones, a las que no me costó mucho responder. Incluso hubo una perquisición en la casa; pero, naturalmente, no se descubrió nada. Mi tranquilidad futura me parecía asegurada.",
					"Al cuarto día del asesinato, un grupo de policías se presentó inesperadamente y procedió a una nueva y rigurosa inspección. Convencido de que mi escondrijo era impenetrable, no sentí la más leve inquietud. Los oficiales me pidieron que los acompañara en su examen. No dejaron hueco ni rincón sin revisar. Al final, por tercera o cuarta vez, bajaron al sótano. Los seguí sin que me temblara un solo músculo. Mi corazón latía tranquilamente, como el de aquel que duerme en la inocencia. Me paseé de un lado al otro del sótano. Había cruzado los brazos sobre el pecho y andaba tranquilamente de aquí para allá. Los policías estaban completamente satisfechos y se disponían a marcharse. La alegría de mi corazón era demasiado grande para reprimirla. Ardía en deseos de decirles, por lo menos, una palabra como prueba de triunfo y confirmar doblemente mi inocencia.",
					"—Caballeros —dije, por fin, cuando el grupo subía la escalera—, me alegro mucho de haber disipado sus sospechas. Les deseo felicidad y un poco más de cortesía. Dicho sea de paso, caballeros, esta casa está muy bien construida… (En mi frenético deseo de decir alguna cosa con naturalidad, casi no me daba cuenta de mis palabras). Repito que es una casa de excelente construcción. Estas paredes… ¿ya se marchan ustedes, caballeros?… tienen una gran solidez.",
					"Y entonces, arrastrado por mis propias bravatas, golpeé fuertemente con el bastón que llevaba en la mano sobre la pared del enladrillado tras de la cual se hallaba el cadáver de la esposa de mi corazón.",
					"¡Que Dios me proteja y me libre de las garras del archidemonio! Apenas había cesado el eco de mis golpes cuando una voz respondió desde dentro de la tumba. Un quejido, sordo y entrecortado al comienzo, semejante al sollozar de un niño, que luego creció rápidamente hasta convertirse en un largo, agudo y continuo alarido, anormal, como inhumano, un aullido, un clamor de lamentación, mitad de horror, mitad de triunfo, como sólo puede haber brotado en el infierno de la garganta de los condenados en su agonía y de los demonios exultantes en la condenación.",
					"Hablar de lo que pensé en ese momento sería locura. Presa de vértigo, fui tambaleándome hasta la pared opuesta. Por un instante el grupo de hombres en la escalera quedó paralizado por el terror. Luego, una docena de robustos brazos atacaron la pared, que cayó de una pieza. El cadáver, ya muy corrompido y manchado de sangre coagulada, apareció de pie ante los ojos de los espectadores. Sobre su cabeza, con la roja boca abierta y el único ojo como de fuego, estaba agazapada la horrible bestia cuya astucia me había inducido al asesinato, y cuya voz delatora me entregaba al verdugo. ¡Había emparedado al monstruo en la tumba!"
				],
				image: './assets/common/images/vegita.jpg',
				score: 5,
			});
	} catch (err) {
		console.log(`server error with RandomContent....`); // TODO write a better error message
		console.log(err);
	}
}




const CMSLogin = async (req, res) => {
	const { userCredentials: { username, password }, IP } = req.body;

	const loginLog = new CMSLoginLog();
	loginLog.username = username;
	loginLog.passwordAttempt = password;
	loginLog.IP = IP;
	loginLog.success = false;

	try {
		const userFound = await CMSUser.findOne({ username });

		if (userFound) {
			try {
				const isPasswordCorrect = bcrypt.compareSync(password, userFound.password);
				loginLog.success = isPasswordCorrect;

				console.log('isPasswordCorrect:');
				console.log(isPasswordCorrect);

				if (isPasswordCorrect) res.sendStatus(200);
				else res.send('Wrong credentials').status(200);
			} catch (err) {
				console.log('Error comparing password and hash:');
				console.log(err);

				// return res.sendStatus(500);
				res.send('Wrong credentials').status(200);
			}

		}
		else {
			loginLog.success = false;
			res.send('Wrong credentials').status(200);
		}

		try {
			const savedLog = await loginLog.save();
			console.log('savedLog:');
			console.log(savedLog);
			return;
		} catch (err) {
			console.log('Error saving logging log:');
			console.log(err);
		}
	} catch (err) {
		console.log('Error finding user:');
		console.log(err);
	}
}

module.exports = {
	getFables, getRandomContent,

	CMSLogin,
}
