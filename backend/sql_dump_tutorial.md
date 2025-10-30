
## 📤 Tworzenie backupu bazy MySQL
Jeśli chcesz wykonać kopię zapasową bazy danych działającej w kontenerze:

```sh
docker exec -i fashion-database mysqldump -u root -p"twoje_haslo" --default-character-set=utf8 nazwa_bazy > ./fashionassistant/src/main/resources/dump.sql
```


## 📥 Przywracanie bazy danych
Aby przywrócić bazę danych z pliku backupu:

```sh
cat ./dumps/dump.sql | docker exec -i fashion-database /usr/bin/mysql -u root --password="haslo" nazwa_bazy
```
