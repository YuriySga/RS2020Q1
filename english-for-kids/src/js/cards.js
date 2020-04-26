const cards = [ 
  ['Action (set A)', 'Action (set B)', 'Action (set C)', 'Adjective', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions'],
  [
    {
      word: 'cry',
      translation: 'плакать',
      image: 'https://drive.google.com/uc?export=view&id=1LJfOuEV8i1ogMT3TKcpA_rsQNATLGrb4',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1Q5SJjsJTH1T_BQNyEqYahnbhA-vtASTR'
    },
    {
      word: 'dance',
      translation: 'танцевать',
      image: 'https://drive.google.com/uc?export=view&id=1tcS3LNPRBktYgLi4U6iTCT1I7J2hvqD2',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1IwhtFiHhi6gzBqfxbDnvmwqukCCuCMC8'
    },
    {
      word: 'dive',
      translation: 'нырять',
      image: 'https://drive.google.com/uc?export=view&id=1FsNciLHu9uAPjF_2Jzu85K3HHP0NMdvW',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1WmoiOZBUo8UYdY4CwQDHC-Bl7frmev8l'
    },
    {
      word: 'draw',
      translation: 'рисовать',
      image: 'https://drive.google.com/uc?export=view&id=15OFS4-ooFA8nXCP3YWJE49ZdrWix_DdJ',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1FuxxoNjheSYBI3ZHME7BPqgn7GYwBdAU'
    },
    {
      word: 'fish',
      translation: 'ловить рыбу',
      image: 'https://drive.google.com/uc?export=view&id=1cbkXfFPTV5xSNV_U1xSwb3Gh_AO1Cwlf',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1KIJL7SaP7S_PU1FQo0wW7752ufs5-Or1'
    },
    {
      word: 'fly',
      translation: 'летать',
      image: 'https://drive.google.com/uc?export=view&id=10x4d_bQy89ogdTgzk0vu2Ls5RCdayWSG',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1fYY7eHcgvSdo2x1DeZsu9DXnxTqFhbrF'
    },
    {
      word: 'hug',
      translation: 'обнимать',
      image: 'https://drive.google.com/uc?export=view&id=1cdtAnJeUo8o_UyJvhs4jbM3mJkxbSzHO',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1QH84IoGtxBtbbZXabOdtHGIPcVS0Ez5y'
    },
    {
      word: 'jump',
      translation: 'прыгать',
      image: 'https://drive.google.com/uc?export=view&id=1pYYZqnGNQV_7S8VQGaUInZkGSLT11aXz',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1KTZt1IuhgV0SanjfjSxso-5wFa4Bt-Hc'
    }
  ],
  [
    {
      word: 'open',
      translation: 'открывать',
      image: 'https://drive.google.com/uc?export=view&id=1Yofkp9O6c81yXP0urNRoGKmf9lrYlyAg',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1LCi418RNOKx6cwkQlMLqOTDLQwjOsirE'
    },
    {
      word: 'play',
      translation: 'играть',
      image: 'https://drive.google.com/uc?export=view&id=1Ipz0qIrUoqmVUdkc23kuOLX61GGCa9hI',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1HWptz8PqtGpqAE8RxBqBTxjLfDKIckrZ'
    },
    {
      word: 'point',
      translation: 'указывать',
      image: 'https://drive.google.com/uc?export=view&id=1pKEP-oBEwLjyn38IDkHgeY5DNQbtslQn',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1h4ByOg-_0cRomCXuWNDUJtxVN3b-30Uq'
    },
    {
      word: 'ride',
      translation: 'ездить',
      image: 'https://drive.google.com/uc?export=view&id=1_ZrPmF3br_hWASHeDYTFikZ0lD1fDc-H',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1aS9WjGejaj7QplBuNq2YS6XnJFRclaaU'
    },
    {
      word: 'run',
      translation: 'бегать',
      image: 'https://drive.google.com/uc?export=view&id=1I_GirOPwEErX0VWZ1ZaU8wcvuO5yAA0Z',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1gxT5-Qtvy5UbveLO0HYxr35B5-TauErz'
    },
    {
      word: 'sing',
      translation: 'петь',
      image: 'https://drive.google.com/uc?export=view&id=1mTBwDgakfN0WQOK6SbNpurQ4-kueFsBn',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1t6TAeIqxg5pPh5Ld5lWkXin7vCkiUwtv'
    },
    {
      word: 'skip',
      translation: 'пропускать, прыгать',
      image: 'https://drive.google.com/uc?export=view&id=1a2tfsfAz9kvrBu-8fXdnvUge-ByJtBO3',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1pq-GCcUz-K_5SEVUTBUnqBj_vi3VuG8E'
    },
    {
      word: 'swim',
      translation: 'плавать',
      image: 'https://drive.google.com/uc?export=view&id=1oQS5QwHGCuNMMOuLkpzVx2JddZ2G1xj4',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1Os8xhh-j41QfpbQrTkXPclT4L9p-zkH5'
    }
  ],
  [
    {
      word: 'surf',
      translation: 'серфинг',
      image: 'https://drive.google.com/uc?export=view&id=1j2J7bm0AnMpYWa0Le6PtqGDYs7ezFEyL',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1A89AUuL0gtHNqZDThAtTB5f2AOzV-J-q'
    },
    {
      word: 'watch',
      translation: 'смотреть',
      image: 'https://drive.google.com/uc?export=view&id=1ZWvHICIk1UhvcrXDBn0KJJo2WPzX6xIT',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1dSD2R6oKvCkEvHpNaglaWxOmawxztcYs'
    },
    {
      word: 'build',
      translation: 'строить',
      image: 'https://drive.google.com/uc?export=view&id=1InYTTfM-H6BxQqQF5BtuBs6YeQSPySnl',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1LuieKvppJXIGRCsG-WeFrcM6P0qNvitB'
    },
    {
      word: 'wash',
      translation: 'мыть',
      image: 'https://drive.google.com/uc?export=view&id=1Cw5EExNn7hnsQnlKFYBCc_7kXw-CdjeH',
      audioSrc: 'https://drive.google.com/uc?export=view&id=13bJTWP2wfu-jJSSO5ZcCkGBOPMM5vwJr'
    },
    {
      word: 'write',
      translation: 'писать',
      image: 'https://drive.google.com/uc?export=view&id=1Cr_KfkW8NysZ4DwmXnYIJhC31vF35yYR',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1xjBMWfOgfzMNpwY__V8Np0blhVFPmoGc'
    },
    {
      word: 'dig',
      translation: 'копать',
      image: 'https://drive.google.com/uc?export=view&id=1uYN6yYGUWhZPsprj8kG9tAOgQ93vD06S',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1NpyDIihgz38TyzJiDK3IMhW3-H1nuv5Q'
    },
    {
      word: 'call',
      translation: 'звонить',
      image: 'https://drive.google.com/uc?export=view&id=1S5kEnzoqOJhEq8whtxFrT1M3HDQs19qV',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1t5vu3yA1UhAruA1_5iZEiLPwuc5hAPRG'
    },
    {
      word: 'feed',
      translation: 'кормить',
      image: 'https://drive.google.com/uc?export=view&id=19hPOKjREc-FonC33FKKFWqW1hnWdiDAT',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1BwFizhyaqr-5RXbUOykMPi9xJYfRhYZg'
    }
  ],
  [
    {
      word: 'beautiful',
      translation: 'красивый',
      image: 'https://drive.google.com/uc?export=view&id=1E5-VhUYoSUHcsZawE-Yhl74Kar9b26gL',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1qeYQ4M3Ob-OfeMF9_J7MflQF-Oo-f-75'
    },
    {
      word: 'terrible',
      translation: 'ужасный',
      image: 'https://drive.google.com/uc?export=view&id=1mRk2zwBNbsV3RONZWDNgKUhzPz6CCy0q',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1-OC4iv2Um80LPj3gbYy0p7ttyCa1f9ES'
    },
    {
      word: 'fluffy',
      translation: 'пушистый',
      image: 'https://drive.google.com/uc?export=view&id=1Vydnh6rdG3sdwb2Y8b25KmogsACpaXhA',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1J8XH7tFE78PN_rYsNq0MokaoajbVlx1F'
    },
    {
      word: 'dirty',
      translation: 'грязный',
      image: 'https://drive.google.com/uc?export=view&id=1X6fwtQLjTVkj0dBBrZY0LOaY9VzTLwaK',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1yaPZDv2Vkz8oOKk893dko4j-TWd49q1r'
    },
    {
      word: 'old',
      translation: 'старый',
      image: 'https://drive.google.com/uc?export=view&id=1g-YZpEsVWJgWZtIhIxe4eoQ4GIscc3gi',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1tHshvWraChbCz92OpTrUD2YEbBep0u1Y'
    },
    {
      word: 'big',
      translation: 'большой',
      image: 'https://drive.google.com/uc?export=view&id=1Zn5d2GVW1lSzNh3hlqlFUDJRWqnzQmeA',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1K-z0znyqR-9VWyzewJ3JP0_5Jn2hG3GU'
    },
    {
      word: 'cold',
      translation: 'холодный',
      image: 'https://drive.google.com/uc?export=view&id=1PceHKCWqn5c0xLlYmNA0VG2KpU1fXVan',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1Zs_Hc2dODOFTnBUJzzVJiM70yemdqRnF'
    },
    {
      word: 'hot',
      translation: 'горячий',
      image: 'https://drive.google.com/uc?export=view&id=1aXk2nQeAmXhziIKO6XETzh-OPFqB7ha_',
      audioSrc: 'https://drive.google.com/uc?export=view&id=18HblpnombiLBm7UrJ-4Ql1y6jNR05zTR'
    }
  ],
  [
    {
      word: 'cat',
      translation: 'кот',
      image: 'https://drive.google.com/uc?export=view&id=1pzLKKoX-ne5nADO_9Tz7826pVRkQGGhE',
      audioSrc: 'https://drive.google.com/uc?export=view&id=178U5nQl-MQ4seP9LZ1AAY9jmkg0a0cNx'
    },
    {
      word: 'chick',
      translation: 'цыплёнок',
      image: 'https://drive.google.com/uc?export=view&id=1Doy15SfJPKXdUQH9wAQcRnfiluPrKK4o',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1UrfmQJT32U5GySUsK81b498xkXK0pcUM'
    },
    {
      word: 'chicken',
      translation: 'курица',
      image: 'https://drive.google.com/uc?export=view&id=1JDASwdPFj8S5ADEO0mJ8YUSEdKCTjLei',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1kHZmq9DPWUc5ZmlA8-G53WLW9YLNEloh'
    },
    {
      word: 'dog',
      translation: 'собака',
      image: 'https://drive.google.com/uc?export=view&id=1046gJ8bi-66RsneHf7V-5072VoAJ5Jl3',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1dMrrbBjsbkWF0GeDKUS97xPc5qfaYVak'
    },
    {
      word: 'horse',
      translation: 'лошадь',
      image: 'https://drive.google.com/uc?export=view&id=1ZR0a4ayWZc0XdBveKasjZYrFDjN6y9Ck',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1DAX4I2_OhdBWAZRuNqprw3iO9V6q1zC3'
    },
    {
      word: 'pig',
      translation: 'свинья',
      image: 'https://drive.google.com/uc?export=view&id=12NYI2QIexKIKGRaEG6luc6MkmFZyX_Uw',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1Wx_PX8oU3aLK89FlNTYtH0eK1YCnWo8Y'
    },
    {
      word: 'rabbit',
      translation: 'кролик',
      image: 'https://drive.google.com/uc?export=view&id=1Fex0QHJ9zNNvg03x5wv3NgIZW7MEZ4D8',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1avmQpexU0qQgqD0rfDo0-8gsLs-7I6gl'
    },
    {
      word: 'sheep',
      translation: 'овца',
      image: 'https://drive.google.com/uc?export=view&id=1t0ckSAWhhpMRe9HLm8tSXXAWGxerp9h6',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1JY3KV0u53t6UZJbHj4eXo8nEfiBBAINO'
    }
  ],
  [
    {
      word: 'bird',
      translation: 'птица',
      image: 'https://drive.google.com/uc?export=view&id=1tDIYXCcZS9jSaLxlCvktCjZO2qRvr2IG',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1J3k9lLdP3Uj9G2fyPKJxb1SscrAi-nxz'
    },
    {
      word: 'fish',
      translation: 'рыба',
      image: 'https://drive.google.com/uc?export=view&id=1cbkXfFPTV5xSNV_U1xSwb3Gh_AO1Cwlf',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1KIJL7SaP7S_PU1FQo0wW7752ufs5-Or1'
    },
    {
      word: 'frog',
      translation: 'жаба',
      image: 'https://drive.google.com/uc?export=view&id=1CfIxodFeKaIsN8_wfHo5yf_gySXWOSHv',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1RmK4NjeulOw7yCLXbbQV1WkvsCK8gdlA'
    },
    {
      word: 'giraffe',
      translation: 'жирафа',
      image: 'https://drive.google.com/uc?export=view&id=1TFblXawEGFvLGFa_j7DK0p0zkO--G4DK',
      audioSrc: 'https://drive.google.com/uc?export=view&id=13xq0f8wa8yuC0Fjz9rq79sYIwa25K2D9'
    },
    {
      word: 'lion',
      translation: 'лев',
      image: 'https://drive.google.com/uc?export=view&id=1JCGUCyRg_ZDIKevd1vTdNrSOYwSbWpZW',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1z_M9X6yEkOgZXY1gHgZAm19uZg8wQmwu'
    },
    {
      word: 'mouse',
      translation: 'мышь',
      image: 'https://drive.google.com/uc?export=view&id=1hKsH4kMXZsUUoRf0YP3ypEV3USDa5gFi',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1b2FIr4eYw5mUE1BO2mlgikEpbvl4m2fg'
    },
    {
      word: 'turtle',
      translation: 'черепаха',
      image: 'https://drive.google.com/uc?export=view&id=1LDY1rct8_EezZA5Eqna4ZNxshsrIbemR',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1UYooZDmid-Jr6VOZbgKe0NoMQ6d7vT_l'
    },
    {
      word: 'dolphin',
      translation: 'дельфин',
      image: 'https://drive.google.com/uc?export=view&id=1ySgSbyUe2yaokwFE1R7YlwCOD9f6-7xZ',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1wFhpT6ZLdUDy_xQwu3d_gD61FeAKLs-V'
    }
  ],
  [
    {
      word: 'skirt',
      translation: 'юбка',
      image: 'https://drive.google.com/uc?export=view&id=1uBdaUgcFya3yffWwSjTM3Z90F_brqwz6',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1myQtHclUulsRVmkjWwDvZk1Fan8WmehX'
    },
    {
      word: 'pants',
      translation: 'брюки',
      image: 'https://drive.google.com/uc?export=view&id=1MhrErSaGeiwKesrUOLbFnngWJVodVgNS',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1bJfa8LruwgZxbMVrs9ZZ6XIFecN7-MxV'
    },
    {
      word: 'blouse',
      translation: 'блузка',
      image: 'https://drive.google.com/uc?export=view&id=13vvCFlggYPwRwSiNQ7uc8q4yl4REevY-',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1fCTrRpTsor9T7QlcwjnJJkxSVYMItU-r'
    },
    {
      word: 'dress',
      translation: 'платье',
      image: 'https://drive.google.com/uc?export=view&id=1u8JTjdZeX43F8vmfHxpE73UQrxXqQE9s',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1N395ra1TbCvWdFufbcW4hASKLUzw_Aip'
    },
    {
      word: 'boot',
      translation: 'ботинок',
      image: 'https://drive.google.com/uc?export=view&id=1Qt3_56EMiZYm_1aI4vJNbxSaWrz5bA5F',
      audioSrc: 'https://drive.google.com/uc?export=view&id=14Ox7Rt89Xkqk-aBL_85y6334TaOSPJI1'
    },
    {
      word: 'shirt',
      translation: 'рубашка',
      image: 'https://drive.google.com/uc?export=view&id=1XcogPStL74X9olxHIAs7QXMBRR68g4Z1',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1mRQXPVVz7LhxQbxpMhK3JL5BFraDEvjK'
    },
    {
      word: 'coat',
      translation: 'пальто',
      image: 'https://drive.google.com/uc?export=view&id=1HV99D-l7bpivPf0D7A5IzgodB9YvRZmE',
      audioSrc: 'https://drive.google.com/uc?export=view&id=13I3ilZzrpBCzsvtpAzU2z1krspu892eF'
    },
    {
      word: 'shoe',
      translation: 'туфли',
      image: 'https://drive.google.com/uc?export=view&id=1Ycpu0LbtF9M12ime9bgjsvywcZUhBPlp',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1YFFmJYMYI0un2Zm5LdHOEhGTugeSV-MA'
    }
  ],
  [
    {
      word: 'sad',
      translation: 'грустный',
      image: 'https://drive.google.com/uc?export=view&id=1wdtkWbhcN6i5fa0FoOuRh8MlNgKeakVe',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1hC7GLfzULOP-POSe1eHi1K2nAmpplrIB'
    },
    {
      word: 'angry',
      translation: 'сердитый',
      image: 'https://drive.google.com/uc?export=view&id=1od_UOXrnBYs05RyTGCeI6xzy-YFNM31P',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1I0aDpMtBr8-o8Q4fiU3QpWmSWNtollvA'
    },
    {
      word: 'happy',
      translation: 'счастливый',
      image: 'https://drive.google.com/uc?export=view&id=1eriUa8O_HhKMAolF9ayUfIy_HInMgJjt',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1_mO59afjzymdA-benLgK8Mr0_yews9dH'
    },
    {
      word: 'tired',
      translation: 'уставший',
      image: 'https://drive.google.com/uc?export=view&id=1rxU4FlavIvNrFqjAh_jIhzyT-4fSifjd',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1TXUY-SL4VSUHMZ6MBLLWcm4hGXJJgf2o'
    },
    {
      word: 'surprised',
      translation: 'удивлённый',
      image: 'https://drive.google.com/uc?export=view&id=1qwg7D4rtIM1o2K-pMjaSt7Kq1zSbrWVz',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1Vv8M22gcN7SPPIwZ5p4Oq_pIevUzrFTM'
    },
    {
      word: 'scared',
      translation: 'испуганный',
      image: 'https://drive.google.com/uc?export=view&id=13v2pHBkDICnpTffndf_onXGH-ACDpUHt',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1_dsWDk8ytRAdRwKvyZjCHmkA4MBrxOTO'
    },
    {
      word: 'smile',
      translation: 'улыбка',
      image: 'https://drive.google.com/uc?export=view&id=175F8IbHXADZvqrgvodGliwD5Rb47tHtf',
      audioSrc: 'https://drive.google.com/uc?export=view&id=1KqK-ssV4E5JEmMHc5URLckFGV2r9Usa_'
    },
    {
      word: 'laugh',
      translation: 'смех',
      image: 'https://drive.google.com/uc?export=view&id=19SjgVyoKjEuZRFytkwLZzkB8gJIsW-Kt',
      audioSrc: 'https://drive.google.com/uc?export=view&id=10ehFMs5WTSoTwgvJQwp4-HdCXQS1O5LP'
    }
  ]
];

/* export cards; */
module.exports = cards;
