import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../common/colors';

const CustomDropdown = props => {
  const {data, setData, prevData} = props;

  const [currentActiveSections, setActiveSections] = useState([]);
  const [selected, setSelected] = useState(
    prevData ? prevData.name : data[0].name,
  );

  useEffect(() => {
    if (data || prevData) {
      setSelected(prevData ? prevData.name : data[0].name);
    }
  }, [data,prevData]);

  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };
  const SECTIONS = [
    {id: 0, sectionData: prevData ? prevData.name : data[0].name},
  ];

  const _renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: colors.black_level_2,
            fontSize: 16,
            fontFamily: 'Lato-Regular',
          }}>
          {selected}
        </Text>
        <Text>
          <AntDesign name="down" size={25} color={colors.grey} />
        </Text>
      </View>
    );
  };

  const _renderContent = () => {
    return (
      <FlatList
        data={data}
        style={{marginTop: 10}}
        renderItem={({item, index}) => {
          if (item === selected) {
            return null;
          } else {
            return (
              <TouchableOpacity
                onPress={() => {
                  setData(item.name);
                  setSelected(item).name;
                  setActiveSections([]);
                }}
                style={{
                  borderTopColor: colors.black_level_3,
                  borderTopWidth: StyleSheet.hairlineWidth,
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    color: colors.black_level_2,
                    fontSize: 16,
                    fontFamily: 'Lato-Regular',
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }
        }}
      />
    );
  };
  return (
    <View>
      <Accordion
        activeSections={currentActiveSections}
        sections={SECTIONS}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        sectionContainerStyle={{
          borderRadius: 8,
          borderWidth: 1,
          padding: 15,
          borderColor: colors.primaryGreen,
          backgroundColor: colors.white_level_3,
        }}
      />
    </View>
  );
};

export default CustomDropdown;
