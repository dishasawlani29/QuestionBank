#from fuzzywuzzy import fuzz #for natural language processing
import pandas as pd#important
import json
import sys
# with open('C:/Users/DISHA/Desktop/Caramel IT Academy/Final/2.QB_Course_Modules_Based_Assignment_Model/1.json',encoding='utf-8') as jsonfile:#here the json file should be dynamic(BACKEND AND AIML)
#         data = json.load(jsonfile,)#json files data is stored in data

def getmcq(a,b1,b2,c,id1):
    print("mcq")
    list_of_dataframes=[]
    list_of_dataframes1=[]
    df = pd.read_csv("C:/Users/DISHA/Desktop/Caramel IT Academy/Final/2.QB_Course_Modules_Based_Assignment_Model/"+"PYM"+".csv",encoding='latin1',error_bad_lines=False)
    df0=df[df['subcourse'].str.contains(b1,na=False)]
    df1=df0[df0['module'].str.contains(b2,na=False)]
    df2=df1[df1['difficulty'].str.contains(difficulty,na=False)]
    df3=df2.sample(n =a, replace = True)
    list_of_dataframes.append(df3)#all the questions till the loop ends will be appended in the list_of_dataframes 
    master_frame=pd.concat(list_of_dataframes,axis=0,ignore_index=True)#all skill questions are received and put in one master frame
    master_frame1=master_frame[['QID']]#master frame1 will fetch the qids of the questions given in master_frame
    list_of_dataframes1.append(master_frame1)#important
    master_df=pd.concat(list_of_dataframes1,axis=0,ignore_index=True)#here all the dataframes are joined in a master_df#important
    master_df.reset_index(inplace=True)#important
    #master_df.to_json(r'C:/Users/DISHA/Desktop/Caramel IT Academy/Final/2.QB_Course_Modules_Based_Assignment_Model/'+id1+'dishacmb.json')#the qids are stored in a locally made json path with the name of the json file given by the id(parameter)
    print(df)
#---------------------------------------------------------Technical Scenario----------------------------------------------------#
#id1=input("Enter the id")

# id1=sys.argv[1]
# get_course_code=sys.argv[2]
# subsection=int(sys.argv[3])
# difficulty=sys.argv[4]
# no_of_mcq=int(sys.argv[5])
# questionlist=sys.argv[6]
# ql=pd.read_json(questionlist)

#id1=data['user_id']
id1="Disha"
#get_course_code=data['courseid']
get_course_code="UIFE"
#subsection=int(data['subsection'])
subsection=1
#difficulty=data['difficulty']
difficulty="easy"
#no_of_mcq=int(data["no_of_mcqquestions"])
no_of_mcq=30
skillcodes={'python':'PY','javascript':'JS','html':'HT','frontend':'UIFE'}

subsection=str(subsection)
subcourse_code=get_course_code+'-'+subsection
getmcq(no_of_mcq,get_course_code,subsection,difficulty,id1)



