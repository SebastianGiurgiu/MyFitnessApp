# MyFitnessApp

## 4.6 Scenarii de utilizare

**Logare/Înregistrare**
>Utilizatorul dacă are cont se poate loga în mod direct și va fi redirecționat spre pagina unde își poate vizualiza alimentele consumate în ziua respective, asta în cazul în care este un simplu utilizator sau dacă este nutriționist și are rol de admin.De asemnea după prima logare nu va mai fi nevoie să se autentifice deoarece datele acestea vor fi salvate local în aplicație.
În caz că utilizatorul nu are cont el trebuie doar să își introducă adresa de email și o parolă pe care o poate vizualiza că sa fie sigur că nu a scris greșit.În acest caz i se va crea în mod direct un cont și va beneficia și el de opțiune de nu a mai introduce din nou datele de cont la fiecare utilizare, acest proces putând fi numit un “Autologin”.
                 
**Vizualizare mese dintr-o zi**

>Odată ce utilizatorul se autentifica în oricare dintre moduri,acesta va fi rediectionat către ecranul ce conține mesele cu aliemtnele consumate dintr-o zi.Fiecare masă va avea produsele selectate afișate separat și pentru fiecare produs va fi precizat numele acestuia,o poză cu el, cantatea în care a fost consumat și numărul de calorii raportat la cantitatea consumată.De asemenea jos în ecran va putea fi văzut numărul total de calorii al tuturor alimentelor consumate pe parcusul întregii zile.
                                          
**Ștergerea unui aliment de la o masă**

>Utilizatorul are opțiunea să tragă un aliment de la o masă înspre stânga, după care va avea opțiunea să șteargă acel aliment de la masa respectivă.
		                        
**Selectarea trecerii la ecranul urmator**
>Aplicația oferă 2 meniuri de navigare.Unul dintre ele este de tip „side menu” sau denumit în limbaj modern un meniu de tip „burger”.Odată selectat butonul specific de deschidere al acelui meniu utilizaorul poate să ajugna în alte ecrane spefice pentru adăugare de noi alimente la o masă dintr-o zi,navigarea spre pagină de „home” a aplicației,cumpărarea de programe de antrename,deschiderea chat-ului pentru a putea vorbi cu alți utilizatori, în caz că are rol de nutriționist poate să ajungă pe un ecran unde vor fi afișate alimentele adăugate în aplicație de către utilizatori sau el poate pur și simplu să se delogheze.Al doilea meniu se află doar în ecranul „home” și cele care sunt „subecrane” are acestuia.Acesta este util deoarece îl poate trimite pe utilizatorul către pagină de adăugare a noi alimente atât în aplicație cât și la mesele sale,la un calculator care îi determină necesarul caloric în funcție de mai multe criterii,la un ecran unde poate vizualiza ce a mâncat în toate zilele în care a folosit aplicație, la un ecran unde poate vedea statistici despre numărul de calorii consumate pe parcusul a mai multe zile sau poate ajunge chiar pe pagină principală unde poate selecta opțiunea de a adaugă alimente la o masă dintr-o zi folosind doar vocea.
                                                    

**Navigare spre ecranul „Add some food”**

>În momentul în care ajunge pe acest ecran , utilizatorul trebuie sa aleagă o categorie din care face parte produsul pe care dorește să îl consume.                                                      
După selectarea categoriei pe care o dorește vor fi afișate alimente spefice ce fac parte din aceasta.
În momentul acesta utilizatorul are o varietatea de opiuni si anume : poate sa selecteze un aliment și sa adauge cantitaea pe care o consumă si să selecteze la ce masă este acel aliment dupa care datele introduse de el vor fi adaugăte in jurnal,în caz că nu gășeste alimentul dorit poate sa folosească bara de căutare pentru a fi mai eficient , iar in caz ca nici asa nu gășeste, el poate să adauge acel aliment in aplicație.\
***Adăugarea unui aliment la una dintre mesele sale***\
Utilizatorul selectează un aliment din cele prezentate și in acel moment se va deschide o nouă fereastră de dialog unde poate vizualiza date despre acel produs si sa adauge cantitatea pe care a consumat-o.În timp ce introduce aceea cantitate, aplicația calculează în mod automat totalul de calorii ce îl contine acel produs raportat la cantitatea scrisa de către utilizator. După finalizarea acestui proces va fi afișat un „toast” care va prezenta pe scurt datele ce au fost introduse.\
***Căutarea unui aliment dupa nume***\
Utilizatorul poate să scrie în bara de căutare litere sau numele unui aliment specific din aceea categorie.În timp ce scrie aplicația va afișa doar alimentele ce conțin acel șir de litere scris de utilizator fără să țină cont dacă sunt litere mari sau mici.\
***Adăugarea unui nou aliment in aplicație***\
Utilizatorul poate apăsa butonul de „Add Food”, după care va fi deshisă o fereastră de dailog unde utilizatorul trebuie să introducă detalii despre acel produs și anume: numărul de proteine,carbohidrați,grăsimi, o scurtă descriere dacă dorește și o poză cu acel produs.Aplicația îi oferă posbilitatea să facă o poză pe loc care va fi incarcată direct in aplicație sau sa seleteze o poză pe care o are deja in telefon.De asemenea după introducerea macronutriențiilor, aplicația calculează direct care este numărul de calorii al acelui produs, iar după finalizarea procesului, alimentul adăugat va fi vizibil tuturor utilizatorilor, însă adminul are dreptul de a șterge acel aliment in caz că, consideră că acesta conține informații false.
                                                 
**Navigare spre ecranul „Buy our workout plans”**
>Utilizatorul este direcționat către un ecran de unde poate alege dintre 3 programe diferite de antrenament în funcție de nivelul său în privința practicării exercițiilor fizice.
Odată ce selectează programul pe care dorește să îl achiziționeze va fi deschisa o nouă fereastră unde va trebui sa iși completeze datele de pe card si adresa de email pe care dorește să primească conținutul antrenamentului.
Aplicația se ocupă atât de tranzacția bancară care va transfera banii din contul utilizatorului de la orice bancă, într-un cont de Stripe de acolo deținatorul contului respectiv poate să îi extragă în orice moment.Odată ce tranzacția a luat sfarșit va fi trimis un email ce conține un fișier PDF cu antrenamentul pe care utilizatorul l-a selectat.Acest proces este foarte rapid durănd cateva secunde.
         
**Apăsarea opțiunii „Logout”**
>În momentul în care utilizatorul alege aceasta opțiune, va fi redirecționat către ecranul de autentificare.

**Navigare spre ecranul „Chat”**
>Acest ecran pe care va ajunge are rolul de a fi un chat global pentru toți utilizatorii aplicației.Acesta are scopul de ai incuraja pe oameni sa ceară sfaturi,să impartă experiențe și pentru ca pe acest grup se află si nutriționistul care este admiul aplicației pot foarte ușor sa ii ceară sfaturi sau să îi pună întrebări pentru a primii răspunsuri direct de la un profesionist
                                                 
**Navigare spre ecranul „Recent food added”**
>Această optiune este disponibilă doar admin-ului.Această pagina îi permite să vadă alimentele întroduse în aplicatie de catre utilizatori si îi da dreptul să le steargă din aplicație în cazul în care consideră că utilizatorul dezinformează prin acest produs sau are dreptul să îl aprobe astfel el va ramane disponibil și va putea fi utilizat de către toți cei care folosesc aplicația.
			 

**Navigare spre ecranul „Home”**
>Odată ajuns in această secțiune de aplicație vei avea posbilitatea să întroduci noi alimente la mesele tale folosind doar vocea.Această funcționalitate este un punct de reper al aplicației și nu mai este întalnit în alte aplicații cunoscute în acest domeniu.Utilizatorul trebui doar să apese butonul „Start Listening”, după care va trebuie sa pronunțe alimentele într-un anumit format pentru a putea fi detectate în aplicație.Odată ce a terminat de vobit va apasa butonul „Stop listening”.În acel moment aplicația va afișa unul sau mai multe texte care reprezintă ce s-a inteles din cuvintele utilizatorului.Utilizatorul alege varianta care corespunde, după care se deschide o nouă ferestră de dialog în care îi sunt prezentate exact alimentele corespunzatoare din aplicație si cantitățiile aferente.Tot ce ramane de facut este ca utilizatorul să finalizeze acest proces si alimentele alese vor fi adăugate în mod automat la una din mese.

                
**Navigari posibile din ecranul de „Home”**
>Odată ajuns în acest ecran utilizatorul are la dispozitie un al doilea meniu de navigare.Prin acesta are posbilitatea de a ajunge in ecranul de „Add  some food”, într-un ecran unde va fi prezent un calculator ce ii poate determina necesarul caloric,unul unde poate să vadă exact ce a mancat în toate ziele anterioare si în alt ecran unde este prezentat in mod grafic numărul de calorii pe care le-a consumat acesta pe parcusul timpului.

**Caculator ce determină necesarul caloric**
>În primă fază vor fi afișate mai multe input-uturi, iar la final după ce au fost completate, utilizatorul poate să determine câte calorii ar trebui să consume în functie de datele pe care le-a completat.

                              
**Vizualizarea meselor ce le-a avut din momentul folosirii aplicației**
>Utilizatorului îi apare în primă fază mesele din ziua curentă însă acesta poate foarte usor să naghieze folosind butoanele „next” si „previous” pentru a putea vedea ce a consumat în ziele trecute.
                                             
**Vizualizarea unei statistici ce reprezintă numarul de calorii consumate**
>Utilizatorul poate să observe dacă a avut o continuitate în numarul de calorii pe care le-a consumat fără să trebuiască să navigheze prin toate ca în opțiunea precedentă,fiind axat doar pe număr nu și cum a ajuns la aceste cifre.
                                                        
