#include <iostream>
#include <unordered_map>
#include <string>
#include <emscripten.h>


extern "C" {

EMSCRIPTEN_KEEPALIVE
bool isAnagram(char* cs, char * cy) {
    std::string s(cs);
    std::string y(cy);
    if( s.length() != y.length())
        return false;
    
    std::unordered_map<char, int> countS, countY;
        
    for(int i = 0; i < s.length(); i++) {
        countS[s[i]] = 1 + countS[s[i]];
        countY[y[i]] = 1 + countY[y[i]];
    }
    
    for (auto item : countS) {
        if(item.second != countY[item.first]) 
            return false;
    }
    
    return true;    
}

}
